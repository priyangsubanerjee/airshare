/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Fade } from "react-reveal";

function ShareMenu({ visible, close, from, to, socket }) {
  return (
    <div>
      <Fade when={visible}>
        {visible && (
          <div className="fixed inset-0 h-full w-full bg-black/50 z-10"></div>
        )}
      </Fade>
      <Fade bottom when={visible}>
        {visible && (
          <div className="fixed inset-0 h-full w-full flex items-end z-20">
            <div className="h-auto w-full bg-white">
              <div>
                <div className="flex items-center justify-end px-5 py-3">
                  <button
                    hidden
                    onClick={() => close()}
                    className="text-sm text-neutral-700"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="w-full px-5 mt-3 flex items-center justify-center space-x-5">
                <div className="flex text-lg animate-pulse">
                  <span className="font-bold">Air</span>
                  <span className="font-light">Sharing</span>
                </div>
                <span className="text-stone-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </span>
                <div
                  onClick={() => {
                    socket.emit("notify", {
                      to,
                      from,
                    });
                  }}
                  className="flex items-center"
                >
                  <div className="h-10 w-10 bg-gradient-to-br from-yellow-50 to-red-50 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={to.image}
                      alt=""
                      className="h-7 w-7 rounded-full pointer-events-none"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] ml-2 bg-white text-neutral-700 text-left">
                      {to.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="px-5 space-y-2">
                  <label htmlFor="" className="text-xs text-stone-500">
                    Enter a message
                  </label>
                  <div className="bg-stone-100 py-2 px-4 rounded-md">
                    <input
                      className="bg-transparent outline-none w-full"
                      type="text"
                      placeholder="Type a message here"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center p-5 mt-3">
                <button className="flex items-center text-xs bg-sky-50 rounded-full px-4 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                    />
                  </svg>
                  <span className="ml-2">Choose attachments</span>
                </button>
              </div>
              <div className="flex justify-end items-center p-5 mt-7 border-t">
                <button onClick={() => close()} className="text-sm mr-7">
                  Cancel
                </button>
                <button className="text-sm bg-slate-900 text-white w-28 py-2 rounded-full flex items-center justify-center space-x-3">
                  <span>Send</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </Fade>
    </div>
  );
}

export default ShareMenu;
