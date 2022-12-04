import React, { useState, useEffect, useLayoutEffect } from "react";
import { QrReader } from "react-qr-reader";
import { useRouter } from "next/router";

function Scan() {
  const router = useRouter();
  return (
    <div>
      <div className="">
        <QrReader
          delay={300}
          style={{ width: "100%" }}
          containerStyle={{ width: "100%" }}
          videoContainerStyle={{ width: "100%" }}
          videoStyle={{ width: "100%" }}
          onResult={(data, error) => {
            if (data) {
              const url = new URL(data);
              const room = url.searchParams.get("room");
              if (room) {
                router.push(`/?room=${room}`);
              }
              return;
            }
          }}
          constraints={{
            facingMode: "environment",
          }}
        />
      </div>
      <div className="p-5 -mt-10">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ex fuga
        tenetur quidem, mollitia voluptates labore inventore voluptatem alias
        dolores quis quam eos unde quasi repellat sint optio! Sit,{" "}
        <molestias className=""></molestias>
      </div>
    </div>
  );
}

export default Scan;
