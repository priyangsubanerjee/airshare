import React, { useState, useEffect, useLayoutEffect } from "react";
import { QrReader } from "react-qr-reader";

function Scan() {
  const [pageLoaded, setPageLoaded] = useState(false);
  return (
    <div>
      <div className="-mt-12">
        <QrReader
          delay={300}
          style={{ width: "100%" }}
          containerStyle={{ width: "100%" }}
          videoContainerStyle={{ width: "100%" }}
          videoStyle={{ width: "100%" }}
          onScan={(data) => {
            if (data) {
              let url = new URL(data);
              let room = url.searchParams.get("room");
              if (room) {
                window.location.href = `/?room=${room}`;
              }
            }
          }}
          constraints={{
            facingMode: "environment",
          }}
        />
      </div>
    </div>
  );
}

export default Scan;
