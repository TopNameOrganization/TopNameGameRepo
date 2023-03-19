import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';

dotenv.config()

import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined;

  // DEV paths
  const clientDevPath = path.resolve(__dirname, '..', '..', 'client');
  const ssrDevPath = path.resolve(clientDevPath, 'ssr.tsx');
  const templateDevHtmlPath = path.resolve(clientDevPath, 'index.html');

  // PROD paths
  const clientPath = path.resolve(__dirname, '..', '..', '..', 'client');
  const clientDistPath = path.resolve(clientPath, 'dist');
  const templateProdHtmlPath = path.resolve(clientDistPath, 'index.html');
  const ssrClientPath = path.resolve(clientPath, 'dist-ssr', 'ssr.js');
  const assetsPath = path.resolve(clientDistPath, 'assets');
  const gamePath = path.resolve(clientDistPath, 'game');
  const imagesPath = path.resolve(clientDistPath, 'images');

  if (!isProduction) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientDevPath,
      appType: 'custom'
    })

    app.use(vite.middlewares)
  }

  if (isProduction) {
    app.use('/assets', express.static(assetsPath))
    app.use('/game', express.static(gamePath))
    app.use('/images', express.static(imagesPath))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (isProduction) {
        template = await fs.promises.readFile(templateProdHtmlPath, 'utf-8')
      } else {
        template = await fs.promises.readFile(templateDevHtmlPath, 'utf-8')
        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (url: string) => { html: string; muiCss: string; state: object };

      if (isProduction) {
        render = (await import(ssrClientPath)).render;
      } else {
        render = (await vite!.ssrLoadModule(ssrDevPath)).render;
      }

      const renderApp = await render(url);

      const html = template
        .replace(`<!--ssr-outlet-->`, renderApp.html)
        .replace(`<!--initial-state-outlet-->`, `<script>window.__INITIAL_STATE__ = ${JSON.stringify(renderApp.state)}</script>`)
        .replace(`<!--mui-css-outlet-->`, renderApp.muiCss)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (!isProduction) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on http://localhost:${port}`)
  })
}

startServer();