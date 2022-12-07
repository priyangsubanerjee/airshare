import { TextField, Tooltip } from "@mui/material";
import React from "react";
import { Fade, Reveal } from "react-reveal";
import Avatar from "../Avatars";
import File from "../Avatars/File";

function Receive({ handleRemoveObject, obj }) {
  return (
    <Reveal>
      <div className="fixed inset-0 h-full w-full flex lg:items-center lg:justify-center items-end z-20">
        <div className="min-h-[450px] flex flex-col lg:h-auto w-full lg:w-[550px] bg-white relative">
          <div>
            <div className="flex items-center justify-end px-5 py-3">
              <button hidden className="text-sm text-neutral-700">
                Close
              </button>
            </div>
          </div>
          <div className="w-full px-5 mt-3 flex items-center justify-center space-x-5">
            <button
              onClick={() => setSelectUsersActive(true)}
              className="flex items-center -space-x-3"
            >
              <div>
                <Avatar size={"small"} user={obj.from} />
              </div>
            </button>
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
            <div className="flex text-lg animate-pulse">
              <span className="font-bold">Air</span>
              <span className="font-light">Shared</span>
            </div>
          </div>

          <div className="mt-12">
            <div className="px-5 space-y-2">
              <div className="">
                <TextField
                  id="outlined-basic"
                  label="Received a message"
                  variant="outlined"
                  value={obj.message.text}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </div>
            </div>
          </div>

          <div className="flex items-center overflow-auto scrollbar-hide space-x-4 px-5">
            {obj.message.files.length > 0 &&
              obj.message.files.map((file, index) => {
                return <File file={file} key={index} hideRemove={true} />;
              })}
          </div>

          <div className="text-left px-5 mt-10">
            <p className="text-xs text-stone-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-4 h-4 inline-block mr-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                  clip-rule="evenodd"
                />
              </svg>
              Your messages & attachments are{" "}
              <span className="text-teal-600">end-to-end encrypted.</span>
            </p>
          </div>
          <div className="flex items-center p-5 border-t mt-auto">
            <button
              hidden
              onClick={() => handleRemoveObject(obj)}
              className="text-sm mr-7 ml-auto"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleRemoveObject(obj);
              }}
              className="ml-auto text-sm bg-slate-900 text-white w-28 py-2 rounded-full flex items-center justify-center space-x-3 disabled:opacity-50"
            >
              <span>Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 hidden"
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
    </Reveal>
  );
}

export default Receive;
