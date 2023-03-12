import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import { setupStore } from '../client/src/store';

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
  const clientPath = path.resolve(__dirname, '..', 'client');
  const distPath = path.resolve(clientPath, 'dist');
  const ssrClientPath = path.resolve(clientPath, 'ssr-dist', 'client.cjs');
  const ssrPath = path.resolve(clientPath, 'ssr.tsx');
  const templateDevPath = path.resolve(clientPath, 'index.html');
  const templateProdPath = path.resolve(distPath, 'index.html');

  if (!isProduction) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom'
    })

    app.use(vite.middlewares)
  }

  if (isProduction) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (isProduction) {
        template = await fs.promises.readFile(templateProdPath, 'utf-8')
      } else {
        template = await fs.promises.readFile(templateDevPath, 'utf-8')
        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (url: string) => Promise<string>;

      if (isProduction) {
        render = (await import(ssrClientPath)).render;
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