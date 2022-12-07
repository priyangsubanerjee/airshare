/* eslint-disable @next/next/no-img-element */
import React from "react";

function Avatar({ user, displayName, size }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${
          size == "big" ? "h-20 w-20" : "h-12  w-12"
        } border bg-gradient-to-br from-yellow-50 to-red-50 flex items-center justify-center rounded-full overflow-hidden`}
      >
        <img
          src={user.image}
          className={`${
            size == "big" ? "h-14 w-14" : "h-8  w-8 "
          } rounded-full`}
          alt=""
        />
      </div>
      {displayName && (
        <p className="text-[11px] mt-3 text-stone-600">{user.name}</p>
      )}
    </div>
  );
}

export default Avatar;
