/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useRouter } from "next/router";
import QRCode from "react-qr-code";
import SocketObject from "../Class/SocketObject";

let socket = null;

export async function getServerSideProps(ctx) {
  const secondary_room = ctx.query.room || null;
  return {
    props: {
      secondary_room,
    },
  };
}

export default function Home({ secondary_room }) {
  const router = useRouter();
  const [userSocket, setUserSocket] = useState(null);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [uniqueUsersInRoom, setUniqueUsersInRoom] = useState([]);

  useLayoutEffect(() => {
    let roomId = null; // Inititalize default room id

    (async () => {
      if (secondary_room) {
        roomId = secondary_room;
      } else {
        try {
          const { data } = await axios.get("https://ip4.seeip.org/json");
          roomId = data.ip;
        } catch (error) {
          console.log(error);
          alert("Error getting IP address");
        }
      }

      socket == null && socketInitializer(roomId); // Initialize socket connection with roomId
    })();
  }, []);

  useEffect(() => {
    const unqiueUsers = usersInRoom.filter((user, index) => {
      return user.id !== userSocket.id;
    });
    setUniqueUsersInRoom(unqiueUsers);
  }, [usersInRoom]);

  const remoteServer =
    process.env.NODE_ENV === "production"
      ? "https://airserver.up.railway.app"
      : "http://localhost:5589";

  const remoteOrigin =
    process.env.NODE_ENV === "production"
      ? "https://airshare.vercel.app"
      : "http://localhost:3000";

  const socketInitializer = async (room) => {
    socket = io(remoteServer, {
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
      const socket_instance = new SocketObject(socket.id, room);
      socket.emit("join-room", socket_instance);
      setUserSocket(socket_instance);
    });

    socket.on("users-in-room", (data) => {
      // todo: toast notifitcation
      setUsersInRoom(data.users);
    });
  };

  return (
    <div className="h-screen w-screen bg-slate-100 p-5">
      {userSocket && <div>{userSocket.id}</div>}
      <QRCode value={`${remoteOrigin}/?room=${userSocket?.room}`} size="100" />
    </div>
  );
}
