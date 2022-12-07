/* eslint-disable @next/next/no-img-element */
import { Tooltip } from "@mui/material";
import React from "react";

function Avatar({ user, displayName, size }) {
  return (
    <Tooltip title={size == "small" && user.name}>
      <div className="flex flex-col items-center justify-center">
        <div
          className={`border ${
            size == "big" ? "h-20 w-20" : "h-12  w-12 border-stone-400"
          } bg-gradient-to-br from-yellow-50 to-red-50 flex items-center justify-center rounded-full overflow-hidden`}
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
    </Tooltip>
  );
}

export default Avatar;
