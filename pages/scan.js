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
          constraints={{
            facingMode: "environment",
          }}
        />
      </div>
    </div>
  );
}

export default Scan;
