import Resources from "../models/queue";
import Rooms from "../models/rooms";
import { CREATE_ROOM, REMOVE_ROOM, BOOK_ROOM,
				FINISH_ROOM, CANCEL_ROOM, UPDATE_ROOM_INFO, GET_ROOM } from './actions'

const resources  = new Resources(Rooms);
const allSockets = [];

export function mainHandler(io) {
	return socket => {
		const updateAllRoomStatus = () => {
			const status = resources.getAllRoomStatus();
			io.sockets.emit(UPDATE_ROOM_INFO, status);
		};
		socket.on(GET_ROOM, () => {
			updateAllRoomStatus();
	  });

	  socket.on(CREATE_ROOM, roomName => {
	  	resources.addRoom(roomName)
	  		.then(updateAllRoomStatus);
	  });

	  socket.on(REMOVE_ROOM, roomName => {
	  	resources.removeRoom(roomName)
	  		.then(updateAllRoomStatus);
	  });

	  socket.on(BOOK_ROOM, roomName => {
	  	resources.addMemberToRoom(roomName, socket);
	  	socket.join(roomName);
	    socket.emit(BOOK_ROOM, {roomName, queueNumber: resources.getRoom(roomName).length-1});
			updateAllRoomStatus();

	  });

	  socket.on(FINISH_ROOM, roomName => {
	  	resources.removeMemberFromRoom(roomName, socket);
	    io.to(roomName).emit(FINISH_ROOM, {roomName});
			updateAllRoomStatus();
	  });

	  socket.on(CANCEL_ROOM, roomName =>{
	  	const affectedMembers = resources.getMembersAfterSpecificMember(roomName, socket);
	  	resources.removeMemberFromRoom(roomName, socket);
	  	for (const member of affectedMembers) {
	  		member.emit(FINISH_ROOM, {roomName})
	  	}
	    socket.emit(CANCEL_ROOM, {roomName});
			updateAllRoomStatus();
	  });

	}
}
