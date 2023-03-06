import React from "react";
import * as renderer from 'react-test-renderer';
import ProfileAvatarDialog from './ProfileAvatarDialog';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as appHooks from "../../hooks/redux";
import { Provider } from "react-redux";
import { userInitialState } from "../../store/constants";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const useAppSelectorMock = jest.spyOn(appHooks, 'useAppSelector');

describe('ProfileAvatarDialog', () => {
  it('should renders profile correctly', () => {
    const isShow = false
    useAppSelectorMock.mockReturnValue(userInitialState)
    const store = mockStore(userInitialState)
    const tree = renderer
        .create(
            <Provider store={store}>
                <ProfileAvatarDialog isShowDialogButton={isShow} />
            </Provider>)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
