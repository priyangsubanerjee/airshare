import { useEffect } from "react";
import io from "socket.io-client";
let socket = null;

export default function Home() {
  useEffect(() => {
    (async () => {
      socket == null && socketInitializer();
    })();
  }, []);

  const socketInitializer = async () => {
    socket = io("https://airserver.up.railway.app", {
      withCredentials: true,
      transports: [
        "websocket",
        "xhr-polling",
        "polling",
        "htmlfile",
        "flashsocket",
      ],
    });

    socket.on("connect", () => {
      console.log("connected");
      console.log(socket.id);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  };

  return <div></div>;
}
