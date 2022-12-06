/* eslint-disable @next/next/no-img-element */
import React from "react";

function RoundedAvatar({ user, displayName }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-12  border border-neutral-400 w-12 bg-gradient-to-br from-yellow-50 to-red-50 flex items-center justify-center rounded-full overflow-hidden">
        <img src={user.image} className="rounded-full h-9 w-9 " alt="" />
      </div>
      {displayName && (
        <p className="text-[10px] mt-3 text-stone-600">{user.name}</p>
      )}
    </div>
  );
}

export default RoundedAvatar;
