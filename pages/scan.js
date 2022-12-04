import React, { useState, useEffect } from "react";
import QrCodeReader, { QRCode } from "react-qrcode-reader";
import { QrReader } from "react-qr-reader";

function scan() {
  const handleRead = (code) => {
    console.log(code.data);
  };

  return (
    <div>
      <div className="mt-10">
        <QrReader />
      </div>
    </div>
  );
}

export default scan;
