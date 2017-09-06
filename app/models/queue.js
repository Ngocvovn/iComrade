import R from 'ramda';

let _instance = null;
export default class Resources {
  constructor() {
    if (!_instance) {
      _instance = this;
      this.resources = {};
    }

    return _instance;
  }

  addRoom(roomID) {
  	this.resources[roomID] = this.resources[roomID] || [];
  }

  removeRoom(roomID) {
  	this.resources = R.omit([roomID], this.resources);
  }

  addMemberToRoom(roomID, memberID) {
  	this.addRoom(roomID);
  	const room = this.resources[roomID];
  	const existID = R.find(R.equals(roomID), room);
  	if (!!existID) {
  		console.warn("This member already exist");
  		return false;
  	}
  	this.resources[roomID].push(memberID);
  	return true
  }

  removeMemberFromRoom(roomID, memberID) {
  	if (!this.resources[roomID]) return; 	
  	this.resources[roomID] = R.filter(id => id !== memberID , this.resources[roomID]);
  }

  
}