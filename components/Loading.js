/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Fade } from "react-reveal";

function Loading({ visible }) {
  return (
    <div>
      <Fade when={visible}>
        {visible && (
          <div className="h-screen w-screen fixed inset-0 bg-white flex flex-col items-center justify-center">
            <div className="flex items-center text-2xl lg:text-3xl tracking-wide text-slate-800">
              <img src="/logo.png" alt="" className="h-11 lg:h-16 mr-3" />
              <div>
                <div className="flex">
                  <span className="font-bold">Air</span>
                  <span className="font-light">Share</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-3">
              <div className="border border-neutral-600 rounded-full h-4 w-4 border-t-transparent animate-spin"></div>
              <p>
                <span className="text-xs text-neutral-500">Joining room</span>
              </p>
            </div>
          </div>
        )}
      </Fade>
    </div>
  );
}

export default Loading;
