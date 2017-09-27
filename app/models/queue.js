import R from 'ramda';

let _instance = null;

/**
 * Queue resources single ton class that store data about resources, and users
 */
export default class Resources {
  constructor(Rooms) {
    if (!_instance) {
      _instance = this;

      // Data object in shape of  { roomID: [connectionID]}
      this.resources = {};
  
      this.Rooms = Rooms;

      this.Rooms.getAll()
        .then(rooms => rooms.forEach(room => this.resources[room.name] = []))

      this.addRoom = this.addRoom.bind(this)
    }

    return _instance;
  }

  getAllResources() {
    return this.resources
  }

  addRoom(name, description = '') {
    return new Promise((resolve, reject) => {
      const newRoom = new this.Rooms({ name, description})
      newRoom.save((err) => {
        if (err) reject(err);
        this.resources[name] = this.resources[name] || [];
        resolve("Added")
      })
    })   
  }

  removeRoom(name) {
    return new Promise((resolve, reject) => {
      this.Rooms.findOneAndRemove({ name }, (err) => {
        if (err) {
          reject(err)
          return;
        }
        this.resources = R.omit([name], this.resources);
        resolve("Done")
      })
    })   
  }

  getRoom(roomID) {
    return this.resources[roomID]
  }

  addMemberToRoom(roomID, newMember) {
    if (!this.resources[roomID]) {
      this.resources[roomID] = []
    }
  	const members = this.resources[roomID];
  	const existID = R.find(member => member.id === newMember.id, members);
  	if (!!existID) {
  		console.warn("This member already exist");
  		return false;
  	}
  	this.resources[roomID].push(newMember);
  	return true
  }

  removeMemberFromRoom(roomID, RemovedMember) {
  	if (!this.resources[roomID]) return;
  	this.resources[roomID] = R.filter(member => member.id !== RemovedMember.id , this.resources[roomID]);
  }

  getMembersAfterSpecificMember(roomID, canceledMember) {
    const position = this.resources[roomID]
                      .map(({id}) => id)
                      .indexOf(canceledMember.id);
    return this.resources[roomID].filter((_, index) => index > position);
  }

  getAllRoomStatus() {
    return R.keys(this.resources).reduce((obj, key) => Object.assign(obj, { [key]: this.resources[key].length }), {});
  }


}
