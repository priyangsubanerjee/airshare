import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

function Scan() {
  const [data, setData] = useState("No result");

  return (
    <div>
      <QrReader
        className="w-full h-full"
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
      />

      <p>{data}</p>
    </div>
  );
}

export default Scan;
