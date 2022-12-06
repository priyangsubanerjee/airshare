/* eslint-disable @next/next/no-img-element */
import React from "react";

function RoundedAvatar({ user }) {
  return (
    <div className="h-10 border w-10 bg-gradient-to-br from-yellow-50 to-red-50 flex items-center justify-center rounded-full overflow-hidden">
      <img src={user.image} className="rounded-full h-7 w-7" alt="" />
    </div>
  );
}

export default RoundedAvatar;
