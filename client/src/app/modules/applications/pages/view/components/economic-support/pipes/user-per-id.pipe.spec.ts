import { UserPerIdPipe } from './user-per-id.pipe';

describe('UserPerIdPipe', () => {
  it('create an instance', () => {
    const pipe = new UserPerIdPipe();
    expect(pipe).toBeTruthy();
  });
});
