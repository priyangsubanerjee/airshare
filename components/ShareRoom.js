import Link from "next/link";
import React from "react";
import QRCode from "react-qr-code";
import { Fade } from "react-reveal";
import toast, { Toaster } from "react-hot-toast";

function ShareRoom({ visible, roomId, close }) {
  return (
    <div>
      <Fade when={visible}>
        {visible && (
          <div className="fixed inset-0 h-full w-full bg-black/50 z-10"></div>
        )}
      </Fade>
      <Fade bottom when={visible} duration="500">
        {visible && (
          <div className="fixed inset-0 h-full w-full z-20 flex justify-center items-end lg:items-center">
            <div className="h-auto bg-white w-full lg:w-[550px] pb-7 lg:px-4">
              <div className="p-4 flex items-center justify-end">
                <button
                  onClick={() => close()}
                  className="text-slate-700 text-sm"
                >
                  Cancel
                </button>
              </div>
              <div className="px-4">
                <h1 className="font-semibold">
                  Let your friends join this room.
                </h1>
                <p className="text-xs text-stone-500 mt-2">
                  Copy provided address and send it to the other person...
                </p>
                <div
                  onClick={() => {
                    try {
                      navigator.clipboard.writeText(
                        `https://airshare.vercel.app?room=${roomId}`
                      );
                      toast.success("Link copied successfully!");
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  className="flex items-center bg-stone-100 p-3 rounded mt-6"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  </svg>
                  <p className="bg-stone-100 ml-2 w-full text-sm overflow-auto whitespace-nowrap scrollbar-hide">
                    https://airshare.vercel.app?room={roomId}
                  </p>
                </div>
                <p className="text-xs text-stone-500 mt-8">
                  or{" "}
                  <Link href={"/scan"}>
                    <>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4 inline-block text-blue-500"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                          />
                        </svg>
                      </span>{" "}
                      <span className="text-blue-500">scan</span> this QR code
                      on
                    </>
                  </Link>
                  the other device
                </p>
                <div className="flex items-center justify-center mt-5">
                  <QRCode
                    value={`https://airshare.vercel.app?room=${roomId}`}
                    size={150}
                  />
                </div>
                <p className="text-xs text-stone-500 mt-8">
                  Once the other person open this page in a browser, you&apos;ll
                  see each other&apos;s avatars.
                </p>
                <button
                  onClick={() => close()}
                  className="mt-5 w-full text-sm font-medium p-3 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-300"
                >
                  Got it !
                </button>
              </div>
            </div>
          </div>
        )}
      </Fade>
    </div>
  );
}

export default ShareRoom;
