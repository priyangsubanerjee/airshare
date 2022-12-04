import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

function Scan() {
  const [data, setData] = useState("No result");

  return (
    <div>
      <div className="w-full h-[500px]">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <p>{data}</p>
    </div>
  );
}

export default Scan;
