/* eslint-disable @next/next/no-img-element */
import React from "react";

function RoundedAvatarBig({ user, displayName }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-16 lg:h-20 border w-16 lg:w-20 bg-gradient-to-br from-yellow-50 to-red-50 flex items-center justify-center rounded-full overflow-hidden">
        <img
          src={user.image}
          className="rounded-full h-12 lg:h-16 w-12 lg:w-16"
          alt=""
        />
      </div>
      {displayName && (
        <p className="text-[11px] mt-3 text-stone-600">{user.name}</p>
      )}
    </div>
  );
}

export default RoundedAvatarBig;
