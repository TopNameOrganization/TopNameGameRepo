import axios from "axios";

export type UserProfileData = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export type UserPasswordData = {
    oldPassword: string;
    newPassword: string;
}

const baseUrl = 'https://ya-praktikum.tech/api/v2/user'

class UserAPI {
  public async changeUserProfile(data: UserProfileData) {
    try {
      const response = await axios.put(`${baseUrl}/profile`, { data });
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.error('changeUserProfile ', error);
    }
  }

  public async changeUserAvatar(data: FormData) {
    try {
      const response = await axios.put(`${baseUrl}/profile/avatar`, { data });
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.error('changeUserAvatar ', error);
    }
  }

  public async changeUserPassword(data: UserPasswordData) {
    try {
      const response = await axios.put(`${baseUrl}/password`, { data });
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.error('changeUserPassword ', error);
    }
  }

  public async getUserById(id: number) {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.error('getUserById ', error);
    }
  }
}

export default new UserAPI();
