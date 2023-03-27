import App from './src/App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import createEmotionServer from '@emotion/server/create-instance'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { setupStore } from './src/store'
import React from 'react'

export function render(url = '/') {
  const cache = createCache({ key: 'css' })
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache)

  const html = renderToString(
    <CacheProvider value={cache}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </CacheProvider>
  )

  const emotionChunks = extractCriticalToChunks(html)
  const muiCss = constructStyleTagsFromChunks(emotionChunks)

  const store = setupStore()

  return {
    html,
    muiCss,
    state: store.getState(),
  }
}
