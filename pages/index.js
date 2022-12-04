/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useRouter } from "next/router";
import QRCode from "react-qr-code";

let socket = null;

export async function getServerSideProps(ctx) {
  const room = ctx.query.room || null;
  return {
    props: {
      room,
    },
  };
}

export default function Home({ room }) {
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

  const router = useRouter();
  const [userSocket, setUserSocket] = useState(null);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [uniqueUsersInRoom, setUniqueUsersInRoom] = useState([]);

  useLayoutEffect(() => {
    (async () => {
      const { data } = await axios.get("https://ip4.seeip.org/json");
      const roomId = room === null ? window.btoa(data.ip) : room;
      socket == null && socketInitializer(roomId);
    })();
  }, []);

  useEffect(() => {
    const unqiueUsers = usersInRoom.filter((user, index) => {
      return user.id !== userSocket.id;
    });
    setUniqueUsersInRoom(unqiueUsers);
  }, [usersInRoom]);

  const remote =
    process.env.NODE_ENV === "production"
      ? "https://airserver.up.railway.app"
      : "http://localhost:5589";

  const socketInitializer = async (room) => {
    console.log("pp", room);
    socket = io(remote, {
      withCredentials: true,
      transports: [
        "websocket",
        "xhr-polling",
        "polling",
        "htmlfile",
        "flashsocket",
      ],
    });

    socket.on("connect", async () => {
      // Get users ip
      try {
        const c_socket = new SocketObject(socket.id, room);
        socket.emit("join-room", c_socket);
        setUserSocket(c_socket);
      } catch (error) {}
    });

    socket.on("users-in-room", (data) => {
      console.log(data.message, data.users);
      setUsersInRoom(data.users);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  };

  return (
    <div>
      {userSocket && (
        <div>
          <div className="p-5">
            <div>You are connected to the server</div>
            <div>Socket ID: {userSocket.getId()}</div>
            <div>Socket Room: {userSocket.getRoom()}</div>
            <div>
              Share url:{" "}
              <a
                target={"_blank"}
                href={`https://airshare.vercel.app?room=${userSocket.room}`}
              >
                https://airshare.vercel.app?room={userSocket.room}
              </a>
            </div>
          </div>
          <div>
            <div className="p-5">
              <QRCode
                size={100}
                value={`https://airshare.vercel.app?room=${userSocket.room}`}
              />
            </div>
          </div>
          <div className="p-5 bg-slate-50">
            Other users in room {uniqueUsersInRoom.length}
            <div>
              {uniqueUsersInRoom.map((user, i) => {
                return (
                  <div key={i}>
                    <p>{user.id}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
