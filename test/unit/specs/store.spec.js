import { mutations } from '@/store';

describe('store', () => {
  it('should update user', () => {
    const state = { count: 0 };
    // apply mutation
    mutations.updateUser(state, { name: 'test' });
    // assert result
    expect(state.currentUser).toEqual({ name: 'test' });
  });
});
