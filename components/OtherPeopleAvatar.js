/* eslint-disable @next/next/no-img-element */
import React from "react";

function OtherPeopleAvatar({ mySocket, user, socket }) {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div
        onClick={() => {
          socket.emit("notify", {
            to: user.id,
            from: mySocket.name,
          });
        }}
        className="h-20 w-20 bg-gradient-to-br from-yellow-50 to-red-50 rounded-full flex items-center justify-center overflow-hidden"
      >
        <img src={user.image} alt="" className="h-16 w-16 rounded-full" />
      </div>

      <p className="text-[11px] mt-2 bg-white text-neutral-500 text-center">
        {user.name}
      </p>
    </div>
  );
}

export default OtherPeopleAvatar;
