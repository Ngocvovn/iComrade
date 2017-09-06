import Resources from '../queue.js';

describe('Test resources', () => {
  it('should add room', () => {
  	const dataQueue = new Resources();
  	dataQueue.addRoom("testRoom1");
  	expect(dataQueue.resources).toEqual({testRoom1: []})
  });

  it('should resources be singleton', () => {
  	const dataQueue = new Resources();
  	dataQueue.addRoom("testRoom2");
  	expect(dataQueue.resources).toEqual({testRoom1: [], testRoom2: []})
  });

  it('should remove room', () => {
  	const dataQueue = new Resources();
  	dataQueue.removeRoom("testRoom2");
  	expect(dataQueue.resources).toEqual({testRoom1: []})
  });

  it('should add member to room', () => {
  	const dataQueue = new Resources();
  	dataQueue.addMemberToRoom("testRoom1", "member1");
  	expect(dataQueue.resources).toEqual({testRoom1: ["member1"]})
  });

  it('should remove member in room', () => {
  	const dataQueue = new Resources();
  	dataQueue.removeMemberFromRoom("testRoom1", "member1");
  	expect(dataQueue.resources).toEqual({testRoom1: []});
  });

  it('should create room and add member to room', () => {
  	const dataQueue = new Resources();
  	dataQueue.addMemberToRoom("testRoom2", "member2");
  	expect(dataQueue.resources).toEqual({testRoom1: [], testRoom2: ["member2"]})
  });

  it('should remove whole room and it members', () => {
  	const dataQueue = new Resources();
  	dataQueue.removeRoom("testRoom2");
  	expect(dataQueue.resources).toEqual({testRoom1: []})
  });
});