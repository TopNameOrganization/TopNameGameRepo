import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import { setupStore } from '../../client/src/store';

dotenv.config()

import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

const isProduction = process.env.NODE_ENV === 'production';
console.log('MTETTEE', __dirname, isProduction);

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined;
  const clientPath = isProduction
    ? path.resolve(__dirname, '..', 'client')
    : path.resolve(__dirname, '..', '..', 'client');
  const ssrPath = path.resolve(clientPath, 'ssr.tsx');
  const templateHtmlPath = path.resolve(clientPath, 'index.html');
  const assetsPath = path.resolve(clientPath, 'assets');

  if (!isProduction) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom'
    })

    app.use(vite.middlewares)
  }

  if (isProduction) {
    app.use('/assets', express.static(assetsPath))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (isProduction) {
        template = await fs.promises.readFile(templateHtmlPath, 'utf-8')
      } else {
        template = await fs.promises.readFile(templateHtmlPath, 'utf-8')
        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (url: string) => string;

      if (isProduction) {
        render = (await import('../../client/ssr')).render;
      } else {
        render = (await vite!.ssrLoadModule(ssrPath)).render;
      }

      const appHtml = await render(url);

      const store = setupStore();

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--initial-state-outlet-->`, `<script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>`)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (!isProduction) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer();