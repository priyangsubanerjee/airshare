import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

const customConfig = {
  dictionaries: [adjectives, colors, animals],
  separator: " ",
  length: 2,
  style: "capital",
};

class SocketObject {
  constructor(id, room) {
    this.id = id;
    this.room = room;
    this.name = uniqueNamesGenerator(customConfig);
    this.image = `https://avatars.dicebear.com/api/avataaars/${this.name.replace(
      " ",
      ""
    )}.svg?mood[]=happy`;
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
