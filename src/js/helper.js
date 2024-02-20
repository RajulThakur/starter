import { TIMEOUT_SEC } from './config.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
// export const getJSON = async function (url) {
//   try {
//     const calling = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const apiData = await calling.json();
//     if (!calling.ok) throw new Error(`${apiData.message} ${calling.status}`);
//     return apiData;
//   } catch (error) {
//     throw error;
//   }
// };
// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(uploadData),
//     });
//     const calling = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const apiData = await calling.json();
//     if (!calling.ok) throw new Error(`${apiData.message} ${calling.status}`);
//     return apiData;
//   } catch (error) {
//     throw error;
//   }
// };

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const calling = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const apiData = await calling.json();
    if (!calling.ok) throw new Error(`${apiData.message} ${calling.status}`);
    return apiData;
  } catch (err) {
    throw err;
  }
};
