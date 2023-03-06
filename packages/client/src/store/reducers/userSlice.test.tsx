import actions from "../actions/index";
import { userReducer } from "./userSlice";
import { userInitialState } from "../constants";
import { User } from "../../api/types";

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

describe('userSlice', () => {
    it('should change status with "fetchUser.pending" action', async () => {
        const state = userReducer(userInitialState, actions.fetchUser.pending);

        expect(state.loading).toBe(true);
        expect(state.error).toBeUndefined();
    });

    it('should fetch user with "fetchUser.fulfilled" action', () => {
        const state = userReducer(userInitialState, actions.fetchUser.fulfilled(userMock, ''));

        expect(state).toEqual({
            loading: false,
            error: undefined,
            user: userMock
        });
    });

    it('should change status and error with "fetchUser.rejected"', () => {
        const action = {
            type: actions.fetchUser.rejected.type,
            payload: 'Server Error!'
        }
        const state = userReducer(userInitialState, action);

        expect(state).toEqual({
            loading: false,
            error: 'Server Error!',
            user: userInitialState.user
        });
    });
});
