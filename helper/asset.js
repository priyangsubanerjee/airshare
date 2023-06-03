// write a promise to upload file to google drive using fetch api

import Compressor from "compressorjs";

let url =
  "https://script.google.com/macros/s/AKfycbwQNoBXjXpHWEb_ZM1sEHU1XMIeNyWqmY1vxZTNZBQv_Fm_iIAoVrL4uDKmjTmpv51z/exec";

export function uploadFile(file, changeStatus, bash = false, folder) {
  let driveLinks = [];

  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: file.size > 1000000 ? 0.5 : file.size > 500000 ? 0.6 : 0.7,
      success(result) {
        changeStatus && changeStatus("Uploading 1/1 files...");
        let fr = new FileReader();
        fr.readAsDataURL(result);
        fr.onloadend = function (e) {
          let res = fr.result;
          let spt = res.split("base64,")[1];
          let obj = {
            base64: spt,
            type: result.type,
            name: result.name,
            folder: folder,
          };

          fetch(url, {
            method: "POST",
            body: JSON.stringify(obj),
          })
            .then((res) => res.json())
            .then((res) => {
              if (bash) changeStatus && changeStatus("Uploaded 1/1 files");
              driveLinks.push(res.data);
              resolve(driveLinks);
            })
            .catch((err) => {
              reject(err);
            });
        };
      },
      error(err) {
        console.log(err.message);
      },
    });
  });
}

export async function uploadFileArray(fileArray, changeStatus, folder) {
  let driveLinks = [];

  for (let index = 0; index < fileArray.length; index++) {
    changeStatus &&
      changeStatus(`Uploading ${index + 1} of ${fileArray.length} files...`);
    const element = fileArray[index];
    const resp = await uploadFile(element, null, true, folder);
    driveLinks.push(resp[0]);
  }
  changeStatus && changeStatus(`Uploaded ${fileArray.length} files`);
  return driveLinks;
}
