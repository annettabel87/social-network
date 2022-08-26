import profileReducer, { addPostCreator, deletePostCreator } from './profileReducer';

const initialState = {
  posts: [
    { id: 1, post: 'Hello', likeCount: 4 },
    { id: 2, post: 'My post 1', likeCount: 2 },
    { id: 3, post: 'My post 2', likeCount: 56 },
    { id: 4, post: 'My post 3', likeCount: 100 },
  ],
  profile: null,
  status: '',
};

test('message of new post be correct', () => {
  const action = addPostCreator('new post');
  const newState = profileReducer(initialState, action);
  expect(newState.posts.length).toBe(5);
});
test('likesCount of new post be correct', () => {
  const action = addPostCreator('new post');
  const newState = profileReducer(initialState, action);
  expect(newState.posts[4].likeCount).toBe(0);
});
test('afte delete post, posts length to be correct', () => {
  const action = deletePostCreator(1);
  const newState = profileReducer(initialState, action);
  expect(newState.posts.length).toBe(3);
});
test('afte delete unknown id post, posts length to be correct', () => {
  const action = deletePostCreator(1000);
  const newState = profileReducer(initialState, action);
  expect(newState.posts.length).toBe(4);
});
