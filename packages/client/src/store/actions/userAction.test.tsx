import actions from "./index";
import { AuthAPI } from "../../api/AuthApi";
import { User } from "../../api/types";
import { AxiosResponse } from "axios";

jest.mock('../../api/AuthApi');

const userMock: User = {
    id: null,
    first_name: null,
    second_name: null,
    display_name: null,
    login: '',
    email: '',
    phone: '',
    avatar: null
}

const errorMock = 'Server Error!';

describe('userAction', () => {
    const AuthApiMock = AuthAPI as jest.Mocked<typeof AuthAPI>;
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    beforeEach(() => {
        AuthApiMock.read.mockClear();
        dispatchMock.mockClear();
        getStateMock.mockClear();
    })

    it('should fetchUser with rejected response', async () => {
        const thunk = actions.fetchUser();
        await thunk(dispatchMock, getStateMock, {});

        const { calls } = dispatchMock.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls
        expect(start[0].type).toBe(actions.fetchUser.pending.type)
        expect(end[0].type).toBe(actions.fetchUser.rejected.type)
        expect(end[0].meta.rejectedWithValue).toBe(true)
        expect(end[0].payload).toBe(errorMock)
    });

    it('should fetchUser with resolved response', async () => {
        const result: Omit<AxiosResponse<User>, 'headers'|'config'> = {
            data: userMock,
            status: 200,
            statusText: ''
        }
        // @ts-ignore
        AuthApiMock.read.mockReturnValue(Promise.resolve(result));

        const thunk = await actions.fetchUser();
        await thunk(dispatchMock, getStateMock, {});

        const { calls } = dispatchMock.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls
        expect(start[0].type).toBe(actions.fetchUser.pending.type)
        expect(end[0].type).toBe(actions.fetchUser.fulfilled.type)
        expect(end[0].payload).toBe(userMock)
    });
});
