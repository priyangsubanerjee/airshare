/* eslint-disable @next/next/no-img-element */
import React from "react";

function File({ file, handleRemoveFile, hideRemove }) {
  const checkFileNameLength = (name) => {
    if (name.length > 10) {
      return name.slice(0, 10) + "..." + name.slice(-3);
    } else {
      return name;
    }
  };

  return (
    <div className="flex items-center shrink-0 border rounded overflow-hidden text-left h-14 px-2">
      <div>
        <img
          className="h-12 w-12 object-cover object-center"
          src={URL.createObjectURL(file) || "/logo.png"}
          alt=""
        />
      </div>
      <div className="flex flex-col px-4">
        <p className="text-xs text-stone-600">
          {checkFileNameLength(file.name)}
        </p>
        <p className="text-[10px] text-stone-400">{file.size}kb</p>
      </div>
      <button hidden={hideRemove} onClick={() => handleRemoveFile(file)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 ml-2 mr-2 text-neutral-700"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export default File;
