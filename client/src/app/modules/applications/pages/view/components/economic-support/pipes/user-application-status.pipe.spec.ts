import { UserApplicationStatusPipe } from './user-application-status.pipe';

describe('UserApplicationStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new UserApplicationStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
