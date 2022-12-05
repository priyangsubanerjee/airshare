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
            constraints={{
              facingMode: "environment",
            }}
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
          <div className="px-5">
            <h1 className="text-lg font-semibold">Scanning in progress...</h1>
            <p className="text-sm text-stone-600 mt-2">
              Place the QR code in the center of the screen to scan.
            </p>
            <button
              className="mt-7 bg-slate-900 text-white p-2 w-full rounded-full"
              onClick={() => close()}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Scan;
