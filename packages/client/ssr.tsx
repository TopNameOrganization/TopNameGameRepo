import App from './src/App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server';

export function render(url = '/') {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}