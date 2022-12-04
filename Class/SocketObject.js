class SocketObject {
  constructor(id, room) {
    this.id = id;
    this.room = room;
  }

  getId() {
    return this.id;
  }
  getRoom() {
    return this.room;
  }
}

export default SocketObject;
