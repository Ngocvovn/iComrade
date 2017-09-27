import Resources from '../queue.js';

//////////// Mock room collections /////////////////

class RoomMock {
  constructor({ name, description}) {
    this.name = name;
    this.description = this.description;
  }

  save(callback) {
    callback()   
  }
}

RoomMock.getAll = () => {
  return new Promise((resolve, reject) => {
    resolve([])
  })
}

RoomMock.findOneAndRemove = (value, callback) => {
  callback()
}

/////////////////////////////////////////////////////

let dataQueue = null;
describe('Test resources', () => {

  beforeEach(() => {
    dataQueue = new Resources(RoomMock);
  })

  it('should add room', async () => {
  	await dataQueue.addRoom("testRoom1", "description")
    expect(dataQueue.resources).toEqual({testRoom1: []})
  });

  it('should resources be singleton', async () => {
  	await dataQueue.addRoom("testRoom2");
  	expect(dataQueue.resources).toEqual({testRoom1: [], testRoom2: []})
  });

  it('should remove room', async () => {
  	await dataQueue.removeRoom("testRoom2");
  	expect(dataQueue.resources).toEqual({testRoom1: []})
  });

  it('should add member to room', () => {
  	dataQueue.addMemberToRoom("testRoom1", { id :"member1" });
  	expect(dataQueue.resources).toEqual({testRoom1: [{ id :"member1" }]})
  });

  it('should not add existing member to room', () => {
    dataQueue.addMemberToRoom("testRoom1", { id :"member1" });
    expect(dataQueue.resources).toEqual({testRoom1: [{ id :"member1" }]})
  });

  it('should remove member in room', () => {
  	dataQueue.removeMemberFromRoom("testRoom1", { id :"member1" });
  	expect(dataQueue.resources).toEqual({testRoom1: []});
  });

  it('should create room and add member to room', async () => {
  	dataQueue.addMemberToRoom("testRoom2", { id :"member2" });
  	expect(dataQueue.resources).toEqual({testRoom1: [], testRoom2: [{ id :"member2" }]})
  });

  it('should getAllResources', () => {
    dataQueue.addMemberToRoom("testRoom1", { id :"member1" });
    expect(dataQueue.getAllResources()).toEqual({testRoom1: [{ id :"member1" }], testRoom2: [{ id :"member2" }]})
  });

  it('should get all rooms status', () => {
    expect(dataQueue.getAllRoomStatus()).toEqual({testRoom1: 1, testRoom2: 1})
  });

  it('should get all member after specific member', () => {
    dataQueue.addMemberToRoom("testRoom1", { id :"member2" });
    dataQueue.addMemberToRoom("testRoom1", { id :"member3" });
    expect(dataQueue.getMembersAfterSpecificMember("testRoom1", { id :"member1" }))
      .toEqual([ { id :"member2" }, { id :"member3" }])
    dataQueue.removeMemberFromRoom("testRoom1", { id :"member2" });
    dataQueue.removeMemberFromRoom("testRoom1", { id :"member3" });
  });


  it('should remove whole room and it members', async () => {
  	await dataQueue.removeRoom("testRoom2");
  	expect(dataQueue.resources).toEqual({testRoom1: [{ id :"member1" }]})
  });

  it('should get all members in room', async () => {
    expect(dataQueue.getRoom('testRoom1')).toEqual([{ id :"member1" }])
  });

  it('should not do any thing when deleting members not in room', async () => {
    dataQueue.removeMemberFromRoom("testRoom1", { id :"member2" });
    expect(dataQueue.getRoom('testRoom1')).toEqual([{ id :"member1" }])
  });
});