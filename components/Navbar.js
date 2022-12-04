/* eslint-disable @next/next/no-img-element */
import React from "react";

function Navbar() {
  return (
    <div className="flex items-center h-16 lg:h-20 px-5 ">
      <div className="flex items-center text-lg lg:text-xl tracking-wide text-slate-800">
        <img src="/logo.png" alt="" className="h-8 lg:h-9 mr-2" />

        <div>
          <div className="flex">
            <span className="font-bold">Air</span>
            <span className="font-light">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
