import axios from 'axios';
import { IUser } from '../interfaces';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '42efb32e-8721-4e68-a9c0-3be6237fc846',
  },
});

export interface IGetUsersData {
  error: string | null;
  items: IUser[];
  totalCount: number;
}
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
export interface IFollowUserData {
  messages: string[];
  resultCode: number;
}
