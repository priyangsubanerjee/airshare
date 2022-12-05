import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";

function Scan({ visible, close, socket }) {
  const router = useRouter();
  const [data, setData] = useState("No result");
  return (
    <div>
      {visible && (
        <div className="fixed inset-0 h-screen w-screen bg-white">
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                socket = null;
                setData(result?.text);
                const url = new URL(result?.text);
                const roomId = url.searchParams.get("room");
                window.location.href = `/?room=${roomId}`;
                close();
              }

              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: "100%" }}
          />
          <p>{data}</p>
        </div>
      )}
    </div>
  );
}

export default Scan;
