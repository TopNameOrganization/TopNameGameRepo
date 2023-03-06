import App from './App'
import * as renderer from "react-test-renderer";

test('should renders App correctly', async () => {
  const tree = renderer
      .create(<App />)
      .toJSON();
  expect(tree).toMatchSnapshot();
})
