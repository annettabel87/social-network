import axios from 'axios';
import { IAuthData, IFollowUserData, IGetUsersData, IProfile } from '../interfaces';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '42efb32e-8721-4e68-a9c0-3be6237fc846',
  },
});

export const userAPI = {
  getUsers(currentPage: number, pageSize: number): Promise<IGetUsersData> {
    return instance
      .get(`users?count=${pageSize}&page=${currentPage}`)
      .then((response) => response.data as IGetUsersData);
  },
  followUser(userId: number): Promise<IFollowUserData> {
    return instance.post(`follow/${userId}`, {}).then((response) => response.data);
  },
  unfollowUser(userId: number): Promise<IFollowUserData> {
    return instance.delete(`follow/${userId}`).then((response) => response.data);
  },
};
export const profileAPI = {
  getUserPage(userId: number): Promise<IProfile> {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  getAuthUserInfo(): Promise<IAuthData> {
    return instance.get(`auth/me`).then((response) => response.data);
  },
  getStatus(userId: number): Promise<string> {
    return instance.get(`profile/status/${userId}`).then((response) => response.data);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, { status: status }).then((response) => response.data);
  },
};
