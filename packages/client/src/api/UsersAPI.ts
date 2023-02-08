import React from "react";
import instance from "./axiosInstance";

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

class UsersAPI extends React.Component {

  static handleChangeUserProfile = async (data: UserProfileData) => {
    try {
      const response = await instance.put(`/user/profile`, data);
      if (response.status === 200) {
        console.log('changeUserProfile: ', response);
      }
    } catch (error) {
      console.error('changeUserProfile error: ', error);
    }
  }

  static handleChangeUserAvatar = async (data: FormData) => {
    try {
      const response = await instance.put(`/user/profile/avatar`, data);
      if (response.status === 200) {
        console.log('changeUserAvatar: ', response);
      }
    } catch (error) {
      console.error('changeUserAvatar error: ', error);
    }
  }

  static handleChangeUserPassword = async (data: UserPasswordData) => {
    try {
      const response = await instance.put(`/user/password`, data);
      if (response.status === 200) {
        console.log('changeUserPassword: ', response);
      }
    } catch (error) {
      console.error('changeUserPassword error: ', error);
    }
  }

  static handleGetUserById = async (id: number) => {
    try {
      const response = await instance.get(`/user/${id}`);
      if (response.status === 200) {
        console.log('getUserById: ', response);
      }
    } catch (error) {
      console.error('getUserById error: ', error);
    }
  }

}

export default UsersAPI;
