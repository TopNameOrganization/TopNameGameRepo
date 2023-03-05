import * as renderer from 'react-test-renderer';
import { ProfileForm } from './ProfileForm';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as appHooks from "../../hooks/redux";
import { Provider } from "react-redux";
import { initialState } from "../../store/constants";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const useAppSelectorMock = jest.spyOn(appHooks, 'useAppSelector');

describe('Profile form', () => {
  const useForm = true;
  const showForm = false;

  it('should renders profile form correctly', () => {
    useAppSelectorMock.mockReturnValue(initialState)
    const store = mockStore(initialState)
    const tree = renderer
        .create(
            <Provider store={store}>
                <ProfileForm noUseForm={useForm} isDisabled={showForm} />
            </Provider>)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
