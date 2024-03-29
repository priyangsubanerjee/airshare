/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import RoomDetails from "../components/Modals/RoomDetails";
import SocketObject from "../socketClass/SocketObject";
import People from "../components/Avatars/People";
import Loading from "../components/Loading";
import Me from "../components/Avatars/Me";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import io from "socket.io-client";
import Head from "next/head";
import axios from "axios";
import Receive from "../components/Modals/Receive";
import { Fade } from "react-reveal";

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
  const [loading, setLoading] = useState(true);
  const [shareRoomActive, setShareRoomActive] = useState(false);
  const closeShareRoom = () => setShareRoomActive(false);
  const [receivedObjects, setReceivedObjects] = useState([]);

  // Initialize socket connection & get Room id

  useLayoutEffect(() => {
    let roomId = secondary_room || null;

    (async () => {
      if (roomId) {
        socket = null;
      } else {
        try {
          const { data } = await axios.get("/api/ip");
          roomId = window.btoa(data.ip);
        } catch (error) {
          console.log(error);
        }
      }

      socket == null && socketInitializer(roomId); // Initialize socket connection with roomId
    })();
  }, []);

  // Get & set unique users in room

  useEffect(() => {
    const unqiueUsers = usersInRoom.filter((user) => {
      return user.id !== userSocket.id;
    });
    setUniqueUsersInRoom(unqiueUsers);
  }, [usersInRoom]);

  // Socket connection initializer

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
      setLoading(false);
    });

    socket.on("users-in-room", (data) => {
      setUsersInRoom(data.users);
    });

    socket.on("test-connection-alert", (data) => {
      toast.success(`Test connection message received.`);
    });

    socket.on("receive-message-obj", (data) => {
      console.log(data);
      setReceivedObjects((prev) => [...prev, data]);
    });

    socket.on("file-recv", (data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    console.log(receivedObjects);
  }, [receivedObjects]);

  const handleRemoveObject = (obj) => {
    setReceivedObjects((prev) => prev.filter((item) => item !== obj));
  };

  //ttps://airserver.up.railway.app

  const remoteServer =
    process.env.NODE_ENV === "production"
      ? "https://fearless-helpful-cotton.glitch.me/"
      : "https://fearless-helpful-cotton.glitch.me/";

  const remoteOrigin =
    process.env.NODE_ENV === "production"
      ? "https://airshare.vercel.app"
      : "http://localhost:3000";

  return (
    <div className="h-screen w-screen bg-white overflow-auto pb-40">
      <Navbar />
      <Head>
        <title>AirShare | File sharing made easy</title>
      </Head>
      {userSocket && (
        <div>
          <div className="flex flex-col justify-center items-center mt-0 lg:mt-0">
            <Me socket={userSocket} />
            <button
              onClick={() => setShareRoomActive(true)}
              className="bg-slate-900 text-xs w-fit text-white rounded-full py-2 px-4 mt-3 flex items-center justify-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                />
              </svg>
              <span>Add more people</span>
            </button>
          </div>
          <div className="mt-2">
            <div className="p-5 lg:px-20 flex items-center space-x-4">
              <h2 className="text-sm font-medium shrink-0 text-neutral-700">
                People near you
              </h2>
              <div className="w-full h-[1px] bg-neutral-200"></div>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-10 px-5 lg:px-20 mt-2 lg:mt-6">
              {uniqueUsersInRoom.map((user, index) => {
                // user stands for the people object

                return (
                  <People
                    uniqueUsersInRoom={uniqueUsersInRoom}
                    mySocket={userSocket}
                    socket={socket}
                    key={index}
                    user={user}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
      <Loading visible={loading} />
      <RoomDetails
        visible={shareRoomActive}
        roomId={userSocket && userSocket.room}
        close={() => closeShareRoom()}
      />

      {receivedObjects.map((obj, index) => {
        return (
          <>
            {index == 0 && (
              <div className="fixed inset-0 h-full w-full bg-black/50 z-10"></div>
            )}
            <Receive
              key={index}
              obj={obj}
              handleRemoveObject={handleRemoveObject}
            />
          </>
        );
      })}
    </div>
  );
}
