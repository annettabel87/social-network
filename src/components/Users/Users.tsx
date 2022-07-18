import axios from 'axios';
import React from 'react';
import { IUser } from '../../interfaces';
import s from './Users.module.scss';
import userPhoto from '../../assets/user.png';

export interface IUsersProps {
  state: IUser[];
  pageSize: number;
  currentPage: number;
  usersCount: number;
  toggleFollow: (userId: number) => void;
  setUsers: (users: IUser[]) => void;
  setCurrentPage: (page: number) => void;
  setUsersCount: (usersCount: number) => void;
}
class Friends extends React.Component<IUsersProps> {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setUsersCount(response.data.totalCount);
      });
  }
  onChangedPage = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  };
  render() {
    const pagesCount = Math.ceil(this.props.usersCount / this.props.pageSize);
    const pages: number[] = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    const curP = this.props.currentPage;
    const curPF = curP - 5 < 0 ? 0 : curP - 5;
    const curPL = curP + 5;
    const slicedPages = pages.slice(curPF, curPL);

    return (
      <div className={s.usersPage}>
        <div className={s.paginationWrapper}>
          {slicedPages.map((p) => {
            return (
              <button
                key={p}
                className={
                  this.props.currentPage === p
                    ? `${s.paginationBtn} ${s.selectedPage}`
                    : s.paginationBtn
                }
                onClick={() => this.onChangedPage(p)}
              >
                {p}
              </button>
            );
          })}
        </div>
        {this.props.state.map((user) => (
          <div className={s.userWrapper} key={user.id}>
            <div className={s.avatarBlock}>
              <img
                src={user.photos.small !== null ? user.photos.small : userPhoto}
                alt="avatar"
                className={s.avatarIcon}
              />
            </div>
            <div className={s.userInfo}>
              <p className={s.mainText}>{user.name}</p>
              <p className={s.text}>{user.status}</p>
              <button
                className={user.followed ? `${s.btn} ${s.follow}` : `${s.btn} ${s.unfollow}`}
                onClick={() => this.props.toggleFollow(user.id)}
              >
                {user.followed ? 'unfollow' : 'follow'}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Friends;
