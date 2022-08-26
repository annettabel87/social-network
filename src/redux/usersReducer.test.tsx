import usersReducer, { setCurrentPage, setUsers, toggleFollow } from './usersReducer';

const initialState = {
  users: [
    {
      id: 1,
      name: 'Anna',
      status: 'My name Anna',
      followed: false,
      uniqueUrlName: 'null',
      photos: {
        small: '',
        large: 'null',
      },
    },
    {
      id: 2,
      name: 'Mikhail',
      status: 'My name Mikhail',
      followed: false,
      uniqueUrlName: 'null',
      photos: {
        small: '',
        large: 'null',
      },
    },
    {
      id: 3,
      name: 'Lev',
      status: 'My name Lev',
      followed: true,
      uniqueUrlName: 'null',
      photos: {
        small: '',
        large: 'null',
      },
    },
  ],
  pageSize: 5,
  currentPage: 1,
  usersCount: 0,
  isFetching: true,
  followingInProgress: [],
};
test('current page to be correct', () => {
  const action = setCurrentPage(5);
  const newState = usersReducer(initialState, action);
  expect(newState.currentPage).toBe(5);
});
test('user following to be correct', () => {
  const action = toggleFollow(2);
  const newState = usersReducer(initialState, action);
  expect(newState.users[1].followed).toBe(true);
});
test('correct user', () => {
  const users = [
    {
      name: 'Olga',
      id: 4,
      status: 'My name Olga',
      followed: false,
      uniqueUrlName: '',
      photos: {
        small: 'null',
        large: 'null',
      },
    },
  ];
  const action = setUsers(users);
  const newState = usersReducer(initialState, action);
  expect(newState.users.length).toBe(1);
});
