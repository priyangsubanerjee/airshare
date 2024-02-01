import { uniqueNamesGenerator, colors, animals } from "unique-names-generator";

const customConfig = {
  dictionaries: [colors, animals],
  separator: " ",
  length: 2,
  style: "capital",
};

class SocketObject {
  constructor(id, room) {
    this.id = id;
    this.room = room;
    this.name = uniqueNamesGenerator(customConfig);
    this.image = `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.name.replace(
      " ",
      ""
    )}`;
  }

  getId() {
    return this.id;
  }
  getRoom() {
    return this.room;
  }

  getName() {
    return this.name;
  }

  getImage() {
    return this.image;
  }
}

export default SocketObject;
