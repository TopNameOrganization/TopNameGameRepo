import * as renderer from 'react-test-renderer';
import ProfileAvatar from './ProfileAvatar';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as appHooks from "../../hooks/redux";
import { Provider } from "react-redux";
import { initialState } from "../../store/constants";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const useAppSelectorMock = jest.spyOn(appHooks, 'useAppSelector');

describe('Profile', () => {
  it('should renders profile correctly', () => {
    useAppSelectorMock.mockReturnValue(initialState)
    const store = mockStore(initialState)
    const tree = renderer
        .create(
            <Provider store={store}>
                <ProfileAvatar />
            </Provider>)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
