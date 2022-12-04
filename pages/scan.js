import React, { useState, useEffect } from "react";
import QrCodeReader, { QRCode } from "react-qrcode-reader";
import { QrReader } from "react-qr-reader";

function scan() {
  const handleRead = (code) => {
    console.log(code.data);
  };

  return (
    <div>
      <div className="mt-10 flex items-center justify-center">
        <QrCodeReader height={500} width={500} />
      </div>
    </div>
  );
}

export default scan;
