import React, { useState, useEffect, useLayoutEffect } from "react";
import QrReader from "react-qr-scanner";
import QrCodeReader, { QRCode } from "react-qrcode-reader";

function Scan() {
  const [pageLoaded, setPageLoaded] = useState(false);
  useLayoutEffect(() => {
    setPageLoaded(true);
  }, []);
  return (
    <div>
      <div className="h-96 overflow-hidden bg-red-50 -pt-10">
        {pageLoaded && (
          <QrCodeReader height={500} width={500} facingMode={"rear"} />
        )}
      </div>
    </div>
  );
}

export default Scan;
