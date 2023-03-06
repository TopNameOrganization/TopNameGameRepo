import actions from "../actions/index";
import { changeUserProfileReducer } from "./changeUserProfileSlice";
import { userInitialState } from "../constants";
import {User, UserProfileData} from "../../api/types";

const userMock: User = {
    id: 123,
    first_name: 'first',
    second_name: 'second',
    display_name: 'display',
    login: 'login',
    email: 'email',
    phone: 'phone',
    avatar: 'ava'
}

const UserProfileDataMock: UserProfileData = {
    first_name: 'first',
    second_name: 'second',
    display_name: 'display',
    login: 'login',
    email: 'email',
    phone: 'phone'
}

describe('changeUserProfileSlice', () => {
    it('should change status with "changeUserProfile.pending" action', async () => {
        const state = changeUserProfileReducer(userInitialState, actions.changeUserProfile.pending);

        expect(state.loading).toBe(true);
        expect(state.error).toBeUndefined();
    });

    it('should fetch user with "changeUserProfile.fulfilled" action', () => {
        const state = changeUserProfileReducer(userInitialState, actions.changeUserProfile.fulfilled(userMock, '', UserProfileDataMock));

        expect(state).toEqual({
            loading: false,
            error: undefined,
            user: userMock
        });
    });

    it('should change status and error with "changeUserProfile.rejected"', () => {
        const action = {
            type: actions.changeUserProfile.rejected.type,
            payload: 'Server Error!'
        }
        const state = changeUserProfileReducer(userInitialState, action);

        expect(state).toEqual({
            loading: false,
            error: 'Server Error!',
            user: userInitialState.user
        });
    });
});
