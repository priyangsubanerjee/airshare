/* eslint-disable @next/next/no-img-element */
import React from "react";

function MyAvatar({ socket }) {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="h-40 w-40 border border-dashed border-rose-100 flex items-center justify-center rounded-full">
        <div className="h-28 w-28 bg-gradient-to-br from-yellow-50 to-red-50 rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={socket.getImage()}
            alt=""
            className="h-20 w-20 rounded-full"
          />
        </div>
      </div>
      <p className="text-xs -mt-5 p-2 bg-white text-neutral-600">
        {socket.getName()}
      </p>
      <p className="text-[10px] -mt-2 p-2 bg-white text-neutral-500">
        {"(Room: "}
        {socket.room}
        {")"}
      </p>
    </div>
  );
}

export default MyAvatar;
