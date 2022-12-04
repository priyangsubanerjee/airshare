import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

function Scan() {
  const [data, setData] = useState("No result");

  return (
    <div>
      <div className="h-44 relative">
        <QrReader
          constraints={{
            facingMode: "environment",
          }}
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          containerStyle={{
            width: "100%",
            padding: "0",
          }}
          videoContainerStyle={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      </div>

      <p>{data}</p>
    </div>
  );
}

export default Scan;
