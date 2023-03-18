import App from './src/App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material';
import { setupStore } from './src/store';

export function render(url = '/') {
  const cache = createCache({ key: 'css' });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);
  const theme = createTheme();

  const html = renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
      </ThemeProvider>
    </CacheProvider>
  );

  const emotionChunks = extractCriticalToChunks(html);
  const muiCss = constructStyleTagsFromChunks(emotionChunks);

  const store = setupStore();

  return {
    html,
    muiCss,
    state: store.getState(),
  }
}