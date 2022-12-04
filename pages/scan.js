import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

function Scan() {
  const [data, setData] = useState("No result");

  return (
    <div>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        containerStyle={{
          width: "100%",
          height: "250px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          postion: "fixed",
          top: "50%",
          left: "50%",
        }}
      />

      <p>{data}</p>
    </div>
  );
}

export default Scan;
