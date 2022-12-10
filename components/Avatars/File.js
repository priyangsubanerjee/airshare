/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import axios from "axios";

function FilePreview({
  file,
  from,
  socket,
  handleRemoveFile,
  hideRemove,
  messageObj,
}) {
  const [uploaded, setUploaded] = useState(false);

  const checkFileNameLength = (name) => {
    if (name.length > 10) {
      return name.slice(0, 10) + "..." + name.slice(-3);
    } else {
      return name;
    }
  };

  useEffect(() => {
    if (uploaded) return;

    (async () => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const { data, status } = await axios.post(
          "https://pidb.up.railway.app/upload/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          }
        );

        if (status === 200) {
          setUploaded(true);
          messageObj.files.map((f) => {
            if (file.name === f.name) {
              file.type = "image/png"
                ? (f.url = "https://pidb.up.railway.app/v1/" + data.key)
                : (f.url = "/logo.png");
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [file]);

  return (
    <div className="flex items-center shrink-0 border rounded overflow-hidden text-left h-14 px-2 relative">
      {uploaded === false && (
        <div className="absolute h-full w-full inset-0 bg-white/90 z-10 flex items-center justify-center">
          <p className="text-xs">Uploading</p>
        </div>
      )}
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

export default FilePreview;
