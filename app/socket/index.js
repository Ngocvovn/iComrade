import Resources from "../models/queue";
import { CREATE_ROOM, REMOVE_ROOM, BOOK_ROOM,
				FINISH_ROOM, CANCEL_ROOM, UPDATE_ROOM_INFO } from './actions'

const resources  = new Resources();
const allSockets = [];

export function mainHandler(io) {
	return socket => {

		const updateAllRoomStatus = () => {
			const status = resources.getAllRoomStatus()
			io.sockets.emit(UPDATE_ROOM_INFO, status)
		}

	  socket.on(CREATE_ROOM, function(roomName){
	  	resources.addRoom(roomName)
	  	// allSockets.forEach(sk => socket.join(roomName))
	  	console.log(resources.getAllRoomStatus());
	    socket.emit(CREATE_ROOM, 0);
			updateAllRoomStatus();
	  });

	  socket.on(REMOVE_ROOM, function(roomName){
	  	resources.removeRoom(roomName)
	  	console.log(resources.getAllRoomStatus());
	  	// allSockets.forEach(sk => socket.join(roomName))
	    socket.emit(REMOVE_ROOM, 0);
			updateAllRoomStatus();
	  });

	  socket.on(BOOK_ROOM, function(roomName){
	  	resources.addMemberToRoom(roomName, socket)
	  	console.log(resources.getAllRoomStatus());
	  	socket.join(roomName);
	  	// allSockets.forEach(sk => socket.join(roomName))
	    socket.emit(BOOK_ROOM, resources.getRoom(roomName).length-1);
			updateAllRoomStatus();

	  });

	  socket.on(FINISH_ROOM, function(roomName){
	  	resources.removeMemberFromRoom(roomName, socket)
	  	console.log(resources.getAllRoomStatus());
	  	// allSockets.forEach(sk => socket.join(roomName))
	    io.to(roomName).emit(FINISH_ROOM, roomName);
			updateAllRoomStatus();
	  });

	  socket.on(CANCEL_ROOM, function(roomName){
	  	const affectedMembers = resources.getMembersAfterSpecificMember(roomName, socket)
	  	resources.removeMemberFromRoom(roomName, socket)
	  	for (const member of affectedMembers) {
	  		console.log(member.id);
	  		member.emit(FINISH_ROOM, roomName)
	  	}
	  	console.log(resources.getAllRoomStatus());
	  	// allSockets.forEach(sk => socket.join(roomName))
	    socket.emit(CANCEL_ROOM, {})
			updateAllRoomStatus();
	  });

	  // socket.on('done', function(roomName){
	  // 	queue = queue.filter(({ id })=> id !== socket.id)
	  //   io.to(roomName).emit('done', {});
	  // });

	  // socket.on('cancel', function(msg){
	  // 	const socketID = socket.id
	  // 	const position = queue.map(({id}) => id).indexOf(socketID)
	  // 	queue = queue.filter(({id}) => id !== socketID)
	  // 	const affectedSockets = queue.filter((_, index) => index >= position)
	  // 	console.log(affectedSockets.length);
	  // 	socket.emit('cancel', {})
	  // 	affectedSockets.forEach(socket => socket.emit('done', {}))
	  //   // io.to('Toilet').emit('cancel', {});
	  // });
	}
}
