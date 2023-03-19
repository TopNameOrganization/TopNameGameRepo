import App from './App'
import * as renderer from "react-test-renderer";
import { BrowserRouter } from 'react-router-dom'

test('should renders App correctly', async () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
})
