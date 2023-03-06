import actions from "./index";
import UsersAPI from "../../api/UsersAPI";
import {User, UserProfileData} from "../../api/types";
import { AxiosResponse } from "axios";

jest.mock('../../api/UsersAPI');

const userProfileMock: UserProfileData = {
    first_name: 'null',
    second_name: 'null',
    display_name: 'null',
    login: '',
    email: '',
    phone: ''
}
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

describe('changeUserProfileAction', () => {
    const UsersApiMock = UsersAPI as jest.Mocked<typeof UsersAPI>;
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    beforeEach(() => {
        UsersApiMock.changeUserProfile.mockClear()
        dispatchMock.mockClear();
        getStateMock.mockClear();
    })

    it('should changeUserProfile with rejected response', async () => {
        const thunk = actions.changeUserProfile(userProfileMock);
        await thunk(dispatchMock, getStateMock, {});

        const { calls } = dispatchMock.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls
        expect(start[0].type).toBe(actions.changeUserProfile.pending.type)
        expect(end[0].type).toBe(actions.changeUserProfile.rejected.type)
        expect(end[0].meta.rejectedWithValue).toBe(true)
        expect(end[0].payload).toBe(errorMock)
    });

    it('should changeUserProfile with resolved response', async () => {
        const result: Omit<AxiosResponse<User>, 'headers'|'config'> = {
            data: userMock,
            status: 200,
            statusText: ''
        }
        // @ts-ignore
        UsersApiMock.changeUserProfile.mockReturnValue(Promise.resolve(result));

        const thunk = await actions.changeUserProfile(userProfileMock);
        await thunk(dispatchMock, getStateMock, {});

        const { calls } = dispatchMock.mock
        expect(calls).toHaveLength(2);

        const [start, end] = calls
        expect(start[0].type).toBe(actions.changeUserProfile.pending.type)
        expect(end[0].type).toBe(actions.changeUserProfile.fulfilled.type)
        expect(end[0].payload).toBe(userMock)
    });
});
