/* eslint-disable @next/next/no-img-element */
import React from "react";

function Navbar() {
  return (
    <div className="flex items-center">
      <div className="flex items-center text-xl lg:text-2xl tracking-wide text-slate-800">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4538/4538546.png"
          alt=""
          className="h-10 mr-2"
        />

        <span className="font-bold">Air</span>
        <span className="font-light">Share</span>
      </div>
    </div>
  );
}

export default Navbar;
