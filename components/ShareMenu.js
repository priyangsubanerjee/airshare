/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line react-hooks/exhaustive-deps

import React, { useState, useEffect, useLayoutEffect } from "react";
import RoundedAvatar from "./RoundedAvatar";
import { Fade } from "react-reveal";

function ShareMenu({ visible, close, from, to, socket, uniqueUsersInRoom }) {
  const [toArray, setToArray] = useState([to]);
  const [selectUsersActive, setSelectUsersActive] = useState(false);
  const [uniqueUsers, setUniqueUsers] = useState([]);

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
      <Fade when={visible}>
        {visible && (
          <div className="fixed inset-0 h-full w-full bg-black/50 z-10"></div>
        )}
      </Fade>
      <Fade bottom when={visible}>
        {visible && (
          <div className="fixed inset-0 h-full w-full flex lg:items-center lg:justify-center items-end z-20">
            <div className="h-auto w-full lg:w-[550px] bg-white lg:rounded-md relative">
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
                <div className="flex items-center -space-x-3">
                  {toArray.map((user, index) => {
                    return (
                      <div key={index}>
                        <RoundedAvatar user={user} />
                      </div>
                    );
                  })}

                  <button
                    onClick={() => setSelectUsersActive(true)}
                    className="h-10 border w-10 bg-neutral-100 flex items-center justify-center rounded-full overflow-hidden"
                  >
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
                </div>
              </div>
              <Fade duration={500} when={selectUsersActive}>
                {selectUsersActive && (
                  <div className="absolute inset-0 h-full w-full shadow-lg bg-white p-5 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h1 className="font-semibold text-neutral-800">
                        Select <span className="font-light">more users</span>
                      </h1>
                      <button
                        onClick={() => setSelectUsersActive(false)}
                        className="text-sm text-blue-500"
                      >
                        Done
                      </button>
                    </div>
                    {uniqueUsers.length == 0 ? (
                      <div className="flex items-center justify-center mt-10">
                        <p className="text-sm text-stone-500">
                          No users to select !
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 mt-5">
                        {uniqueUsers.map((user, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => addOrRemoveUser(user)}
                              className={`flex flex-col py-3 rounded-md border border-transparent items-center relative`}
                            >
                              <RoundedAvatar user={user} displayName={true} />
                              {checkIfUserIsSelected(user) && (
                                <div className="absolute top-2 right-8">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="w-6 h-6 text-teal-500"
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
              <div className="mt-5">
                <div className="px-5 space-y-2">
                  <label htmlFor="" className="text-xs text-stone-500">
                    Enter a message
                  </label>
                  <div className="bg-stone-100 py-2 px-4 rounded">
                    <input
                      className="bg-transparent outline-none w-full"
                      type="text"
                      placeholder="Type a message here"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center p-5 mt-2">
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
