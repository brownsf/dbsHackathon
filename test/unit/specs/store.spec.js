import { mutations, getters, state, actions } from '@/store';

describe('store', () => {
  beforeEach(() => {
    global.error = false;
  });
  it('should update user', () => {
    // apply mutation
    mutations.updateUser(state, { name: 'test' });
    // assert result
    expect(state).toEqual({
      authError: false,
      authenticated: true,
      currentUser: { name: 'test' },
      error: false,
      loginError: false,
      loginErrorMessage: '',
      registerError: {},
      singleTopic: {},
      singleTopicError: {},
      singleTopicLoad: {},
      topicLoad: false,
      topics: [],
    });
  });

  it('errorRegister', () => {
    mutations.errorRegister(state, 'message');
    expect(state.authError).toEqual('message');
  });

  test('addTopic', () => {
    mutations.addTopic(state, 'message');
    expect(state).toEqual({
      authError: 'message',
      authenticated: true,
      currentUser: { name: 'test' },
      error: false,
      loginError: false,
      loginErrorMessage: '',
      registerError: {},
      singleTopic: {},
      singleTopicError: {},
      singleTopicLoad: {},
      topicLoad: false,
      topics: ['message'],
    });
  });
  it('updateTopics', () => {
    mutations.updateTopics(state, { id: 1 });
    expect(state).toEqual({
      authError: 'message',
      authenticated: true,
      currentUser: { name: 'test' },
      error: false,
      loginError: false,
      loginErrorMessage: '',
      registerError: {},
      singleTopic: {},
      singleTopicError: {},
      singleTopicLoad: {},
      topicError: false,
      topicLoad: false,
      topics: { id: 1 },
    });
  });

  test('loadTopics', () => {
    mutations.loadTopics(state);
    expect(state).toEqual({
      authError: 'message',
      authenticated: true,
      currentUser: { name: 'test' },
      error: false,
      loginError: false,
      loginErrorMessage: '',
      registerError: {},
      singleTopic: {},
      singleTopicError: {},
      singleTopicLoad: {},
      topicError: false,
      topicLoad: true,
      topics: { id: 1 },
    });
  });

  test('errorTopics', () => {
    mutations.errorTopics(state);
    expect(state).toEqual({
      authError: 'message',
      authenticated: true,
      currentUser: { name: 'test' },
      error: false,
      loginError: false,
      loginErrorMessage: '',
      registerError: {},
      singleTopic: {},
      singleTopicError: {},
      singleTopicLoad: {},
      topicError: true,
      topicLoad: false,
      topics: { id: 1 },
    });
  });

  test('singleTopic', () => {
    mutations.singleTopic(state);
    expect(state).toEqual({
      authError: 'message',
      authenticated: true,
      currentUser: { name: 'test' },
      error: false,
      loginError: false,
      loginErrorMessage: '',
      registerError: {},
      singleTopic: undefined,
      singleTopicError: false,
      singleTopicLoad: false,
      topicError: true,
      topicLoad: false,
      topics: { id: 1 },
    });
  });

  test('loadTopic', () => {
    mutations.loadTopic(state);
    expect(state).toEqual({
      authError: 'message',
      authenticated: true,
      currentUser: { name: 'test' },
      error: false,
      loginError: false,
      loginErrorMessage: '',
      registerError: {},
      singleTopic: {},
      singleTopicError: false,
      singleTopicLoad: true,
      topicError: true,
      topicLoad: false,
      topics: { id: 1 },
    });
  });
  test('addedTopic', () => {
    mutations.addedTopic(state);
    expect(state).toEqual({
      authError: 'message',
      authenticated: true,
      currentUser: { name: 'test' },
      error: false,
      loginError: false,
      loginErrorMessage: '',
      registerError: {},
      singleTopic: {},
      singleTopicError: false,
      singleTopicLoad: true,
      topicAddError: false,
      topicAddLoad: false,
      topicError: true,
      topicLoad: false,
      topics: { id: 1 },
    });
  });
  test('savingTopic', () => {
    mutations.savingTopic(state);
    expect(state).toEqual({
      authError: 'message',
      authenticated: true,
      currentUser: { name: 'test' },
      error: false,
      loginError: false,
      loginErrorMessage: '',
      registerError: {},
      singleTopic: {},
      singleTopicError: false,
      singleTopicLoad: true,
      topicAddError: false,
      topicAddLoad: true,
      topicError: true,
      topicLoad: false,
      topics: { id: 1 },
    });
  });

  test('errorSaveTopic', () => {
    mutations.errorSaveTopic(state, 'ERROR');
    expect(state).toEqual({
      authError: 'message',
      authenticated: true,
      currentUser: { name: 'test' },
      error: false,
      loginError: false,
      loginErrorMessage: '',
      registerError: {},
      singleTopic: {},
      singleTopicError: false,
      singleTopicLoad: true,
      topicAddError: false,
      topicAddLoad: true,
      topicError: true,
      topicErrorMessage: 'ERROR',
      topicLoad: false,
      topics: { id: 1 },
    });
  });
  test('isAuth', () => {
    expect(getters.isAuth({ currentUser: { id: 1 } })).toEqual(true);
    expect(getters.isAuth({ currentUserS: { id: 1 } })).toEqual(false);
  });

  test('userId', () => {
    expect(getters.userId({ currentUser: { id: 1 } })).toEqual(1);
  });

  test('singleTopic', () => {
    expect(getters.singleTopic({ singleTopic: { id: 1 } })).toEqual({ id: 1 });
  });

  test('getTopics', () => {
    expect(getters.getTopics({ topics: [{ id: 1, votes: 2 }, { id: 2, votes: 5 }] })).toEqual([
      { id: 2, votes: 5 },
      { id: 1, votes: 2 },
    ]);
  });

  test('addComment', async () => {
    const commit = jest.fn();
    const action = await actions.addComment({ commit, getters: { userId: 1 }, dispatch: a => a });
    expect(action).toEqual();
  });
  test('socket_votesChanged', async () => {
    const commit = jest.fn();
    await actions.socket_votesChanged({ commit, getters: { userId: 1 } });
    expect(commit).toBeCalledWith('updateTopics', true);
  });
  test('register', async () => {
    const commit = jest.fn();
    await actions.register({ commit, getters: { userId: 1 } }, { user: 1 });
    expect(commit).toBeCalledWith('updateUser', true);
  });
  test('login', async () => {
    const commit = jest.fn();
    await actions.login({ commit, getters: { userId: 1 } }, { user: 1 });
    expect(commit).toBeCalledWith('updateUser', true);
  });

  test('loginReset', () => {
    const commit = jest.fn();
    actions.loginReset({ commit });
    expect(commit).toBeCalledWith('startLogin');
  });

  test('getAllTopics', async () => {
    const commit = jest.fn();
    await actions.getAllTopics({ commit, getters: { userId: 1 } });
    expect(commit.mock.calls.length).toBe(2);
  });

  test('addTopic', async () => {
    const commit = jest.fn();
    await actions.addTopic({ commit, getters: { userId: 1 } }, { id: 1 });
    expect(commit).toBeCalledWith('addedTopic', true);
    expect(commit).toBeCalledWith('savingTopic');
  });

  test('getTopic', async () => {
    const commit = jest.fn();
    await actions.getTopic({ commit, getters: { userId: 1 } }, { id: 1 });
    expect(commit).toBeCalledWith('loadTopic');
    expect(commit).toBeCalledWith('singleTopic', true);
  });

  test('addComment', async () => {
    const commit = jest.fn();
    const action = await actions.addComment(
      { commit, dispatch: a => a, getters: { userId: 1 } },
      { id: 1 },
    );
    expect(action).toEqual();
  });

  test('getAllTopics error', async () => {
    const commit = jest.fn();
    global.error = true;
    actions.getAllTopics({ commit, getters: { userId: 1 } }).catch(() => {
      expect(commit.mock.calls.length).toBe(2);
    });
  });

  test('addTopic error', async () => {
    const commit = jest.fn();
    global.error = true;
    return actions.addTopic({ commit, getters: { userId: 1 } }, { id: 1 }).catch(() => {
      expect(commit).toBeCalledWith('addedTopic', true);
      expect(commit).toBeCalledWith('savingTopic');
    });
  });

  test('getTopic error', async () => {
    const commit = jest.fn();
    global.error = true;
    return actions
      .getTopic({ commit, getters: { userId: 1 } }, { id: 1 })
      .catch(() => expect(commit).toBeCalledWith('errorGettingTopic', true));
  });
  test('addComment error', async () => {
    const commit = jest.fn();
    global.error = true;
    return actions
      .addComment({ commit, getters: { userId: 1 } }, { id: 1 })
      .catch(() => expect(commit).toBeCalledWith('errorSaveComment', true));
  });
});
