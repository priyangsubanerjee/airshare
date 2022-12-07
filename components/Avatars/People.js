/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import ShareMenu from "../Modals/ShareMenu";

function OtherPeopleAvatar({ mySocket, user, socket, uniqueUsersInRoom }) {
  const [shareMenuActive, setShareMenuActive] = useState(false);

  return (
    <button className="flex flex-col items-center justify-center ">
      <div
        onClick={() => setShareMenuActive(true)}
        className="h-20 w-20 bg-gradient-to-br from-yellow-50 to-red-50 rounded-full flex items-center justify-center overflow-hidden"
      >
        <img
          src={user.image}
          alt=""
          className="h-16 w-16 rounded-full pointer-events-none"
        />
      </div>

      <p className="text-[11px] mt-2 bg-white text-neutral-500 text-center">
        {user.name}
      </p>
      <ShareMenu
        visible={shareMenuActive}
        close={() => setShareMenuActive(false)}
        to={user}
        from={mySocket}
        socket={socket}
        uniqueUsersInRoom={uniqueUsersInRoom}
      />
    </button>
  );
}

export default OtherPeopleAvatar;
