import { getToken } from '../helpers'

describe('Test utils', () => {
	it('should extract token from request', () => {
  	const req = { headers: { 'x-access-token' : 'test' } }
    expect(getToken(req)).toBe('test')
  });

  it('should extract none from request', () => {
  	const req = { headers: { 'x-access-token' : '' } }
    expect(getToken(req)).toBe('')
  });
})