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

  getAllResources() {
    return this.resources
  }

  addRoom(roomID) {
  	this.resources[roomID] = this.resources[roomID] || [];
  }

  removeRoom(roomID) {
  	this.resources = R.omit([roomID], this.resources);
  }

  getRoom(roomID) {
    return this.resources[roomID]
  }

  addMemberToRoom(roomID, newMember) {
  	this.addRoom(roomID);
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

  
}