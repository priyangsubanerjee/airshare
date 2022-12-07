/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line react-hooks/exhaustive-deps

import React, { useState, useEffect, useLayoutEffect } from "react";
import Avatar from "../components/Avatars/index";
import { Fade } from "react-reveal";
import RoundedAvatarBig from "./RoundedAvatarBig";
import toast from "react-hot-toast";
import { ClickAwayListener, TextField, Tooltip } from "@mui/material";

function ShareMenu({ visible, close, from, to, socket, uniqueUsersInRoom }) {
  const [toArray, setToArray] = useState([to]);
  const [selectUsersActive, setSelectUsersActive] = useState(false);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [messageObj, setMessageObj] = useState({
    text: "",
    files: [],
  });

  function addOrRemoveUser(user) {
    if (toArray.find((u) => u.id === user.id)) {
      setToArray(toArray.filter((u) => u.id !== user.id));
    } else {
      setToArray([...toArray, user]);
    }
  }

  function checkIfUserIsSelected(user) {
    return toArray.find((u) => u.id === user.id);
  }

  useEffect(() => {
    if (visible) {
      setUniqueUsers(uniqueUsersInRoom.filter((user) => user.id !== to.id));
    } else {
      setToArray([to]);
    }
  }, [visible]);

  useEffect(() => {
    if (selectUsersActive) {
      setUniqueUsers(
        uniqueUsersInRoom.filter(
          (user) => user.id !== to.id && user.id !== from.id
        )
      );
    } else {
      setUniqueUsers(
        uniqueUsersInRoom.filter(
          (user) => user.id !== to.id && user.id !== from.id
        )
      );
    }
  }, [uniqueUsersInRoom]);

  useEffect(() => {
    const usersToRemove = toArray.filter((user) => {
      return !uniqueUsersInRoom.find((u) => u.id === user.id);
    });

    setToArray(
      toArray.filter((user) => !usersToRemove.find((u) => u.id === user.id))
    );
  }, [uniqueUsers]);

  useEffect(() => {
    toArray.length == 0 && close();
  }, [toArray]);

  return (
    <div>
      <Fade duration={500} when={visible}>
        {visible && (
          <div className="fixed inset-0 h-full w-full bg-black/50 z-10"></div>
        )}
      </Fade>
      <Fade bottom when={visible}>
        {visible && (
          <div className="fixed inset-0 h-full w-full flex lg:items-center lg:justify-center items-end z-20">
            <ClickAwayListener onClickAway={() => close()}>
              <div className="min-h-[450px] flex flex-col lg:h-auto w-full lg:w-[550px] bg-white relative">
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
                  <button
                    onClick={() => setSelectUsersActive(true)}
                    className="flex items-center -space-x-3"
                  >
                    {toArray.map((user, index) => {
                      return (
                        <div key={index}>
                          <Avatar size={"small"} user={user} />
                        </div>
                      );
                    })}

                    <Tooltip arrow title="Add more people">
                      <button className="h-10 border border-neutral-700 w-10 bg-neutral-700 text-neutral-100 flex items-center justify-center rounded-full overflow-hidden">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </Tooltip>
                  </button>
                </div>
                <Fade duration={500} when={selectUsersActive}>
                  {selectUsersActive && (
                    <div className="absolute inset-0 h-full w-full shadow-lg bg-white p-5 rounded-lg z-10">
                      <div className="flex items-center justify-between">
                        <h1 className="font-semibold text-neutral-800">
                          Select <span className="font-light">more users</span>
                        </h1>
                        <button
                          onClick={() => setSelectUsersActive(false)}
                          className="text-sm font-medium text-blue-500"
                        >
                          Done
                        </button>
                      </div>
                      {uniqueUsers.length == 0 ? (
                        <div className="flex items-center justify-center mt-20">
                          <p className="text-sm text-stone-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="w-5 h-5 mr-3 inline-block text-rose-500"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            No users to select !
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 lg:grid-cols-4 mt-5">
                          {uniqueUsers.map((user, index) => {
                            return (
                              <div
                                key={index}
                                onClick={() => addOrRemoveUser(user)}
                                className={`flex flex-col py-3 rounded-md border border-transparent items-center relative`}
                              >
                                <Avatar
                                  size={"big"}
                                  user={user}
                                  displayName={true}
                                />
                                {checkIfUserIsSelected(user) && (
                                  <div className="absolute top-2 right-7 lg:right-8">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      class="w-6 h-6 text-teal-500 bg-white rounded-full"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </Fade>
                <div className="mt-12">
                  <div className="px-5 space-y-2">
                    <div className="">
                      <TextField
                        id="outlined-basic"
                        label="Enter a message"
                        variant="outlined"
                        fullWidth
                        value={messageObj.text}
                        onChange={(e) => {
                          setMessageObj({
                            ...messageObj,
                            text: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-5 mt-0">
                  <Tooltip arrow title="Attach files to send">
                    <button className="flex items-center text-xs bg-sky-50 text-sky-900 rounded-full px-4 py-2">
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
                  </Tooltip>
                </div>
                <div className="text-left px-5 mt-4">
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
                  <Tooltip arrow title="Test connection">
                    <button
                      onClick={() => {
                        if (window.navigator.vibrate) {
                          window.navigator.vibrate(100);
                        }
                        toast.success("Test connection message sent !");
                        socket.emit("test-connection", {
                          to: toArray,
                          from: from,
                        });
                      }}
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
                          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                        />
                      </svg>
                    </button>
                  </Tooltip>

                  <button
                    onClick={() => close()}
                    className="text-sm mr-7 ml-auto"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={
                      messageObj.text.length === 0 &&
                      messageObj.files.length === 0
                    }
                    onClick={() => {
                      socket.emit("send-message-obj", {
                        message: messageObj,
                        to: toArray,
                        from: from,
                      });
                      setMessageObj({
                        text: "",
                        files: [],
                      });
                    }}
                    className="text-sm bg-slate-900 text-white w-28 py-2 rounded-full flex items-center justify-center space-x-3 disabled:opacity-50"
                  >
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
            </ClickAwayListener>
          </div>
        )}
      </Fade>
    </div>
  );
}

export default ShareMenu;
