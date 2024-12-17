const modalBox = document.querySelector("#modal-box");
const modalBoxSupport = document.querySelector("#modal-box-support");
const alertBtn = document.querySelector(".add-alert-btn");
const songContainer = document.querySelector("ul");
const hInput = document.querySelector("#hInput");
const mInput = document.querySelector("#mInput");
const ampmInput = document.querySelector("#ampmInput");
const inputForm = document.querySelector("#inputForm");
const controlsContainer = document.querySelector("#controls-container");
const alertAddBtn = document.querySelector("#add-btn");
const alertContainer = document.querySelector("#alert-container");
const navH = document.querySelector("#navH");
const navM = document.querySelector("#navM");
const navAMPM = document.querySelector("#navAMPM");
const alertSong = document.querySelector("#alert-song");
const pauseBtn = document.querySelector("#pauseBtn");
let hour, minute, amPm;

const alertBox = [];
let alertbanner = true;

const clock = () => {
  hour =
    new Date().getHours() > 12
      ? new Date().getHours() - 12
      : new Date().getHours();
  minute = new Date().getMinutes();
  amPm = new Date().getHours() >= 12 ? "PM" : "AM";

  navH.innerText = hour;
  navM.innerText = minute;
  navAMPM.innerText = amPm;

  alertBox?.map((alert) => {
    if (
      alert.h == hour &&
      alert.m == minute &&
      alert.ampm == amPm &&
      alertbanner
    ) {
      alertSong.src =
        "./songs/24kGoldn - Mood Remix (Lyrics) ft. Justin Bieber_ J Balvin_ Iann Dior(MP3_160K)_1.mp3";
    }
  });
};

const interval = setInterval(clock, 1000);
const setAlert = (e) => {
  e.preventDefault();
  switch (e.target.id) {
    case "hIncrese":
      if (parseInt(hInput.value) < 12) {
        hInput.value = parseInt(hInput.value) + 1;
      }
      break;
    case "hDecrese":
      if (parseInt(hInput.value) > 1) {
        hInput.value = parseInt(hInput.value) - 1;
      }
      break;
    case "mIncrese":
      if (parseInt(mInput.value) < 60) {
        mInput.value = parseInt(mInput.value) + 1;
      }
      break;
    case "mDecrese":
      if (parseInt(mInput.value) > 1) {
        mInput.value = parseInt(mInput.value) - 1;
      }
      break;
    case "toAm":
      ampmInput.value = "AM";
      break;
    case "toPm":
      ampmInput.value = "PM";
      break;
  }
};
const handleAlertBtn = () => {
  hInput.value = hour;
  mInput.value = minute;
  ampmInput.value = amPm;

  modalBox.classList.toggle("dis-none");
  modalBoxSupport.classList.toggle("dis-none");
};

const addAlert = (e) => {
  e.preventDefault();
  const obj = {
    id: Date.now(),
    h: hInput.value,
    m: mInput.value,
    ampm: ampmInput.value,
  };

  alertBox.push(obj);
  modalBox.classList.add("dis-none");
  modalBoxSupport.classList.add("dis-none");
  alertContainer.innerHTML = "";
  alertBox.map((alert) => {
    alertContainer.innerHTML += `
      <div id=${alert.id}
      style="
        display: flex;
      
        justify-content: space-between;
        padding: 10px 20px;
        align-items: center;
        color: white;
        background-color: gray;
      "
    >
      <div style="display: flex; gap: 20px; align-items: center">
        <div>${alert.h}: ${alert.m}  
        ${alert.ampm}</div>
        <div>1 hr 37 min left</div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px">
        <button id="pauseBtn"
          style="
            padding: 3px 5px;
            border: none;
            text-transform: uppercase;
            font-weight: 500;
            letter-spacing: 1px;
            background: white;
          "
        >
          pause
        </button>
        <button
          style="
            padding: 3px 5px;
            border: none;
            text-transform: uppercase;
            font-weight: 500;
            letter-spacing: 1px;
            background: white;
          "
        >
          tr
        </button>
      </div>
    </div>
      
      `;
  });
};
document.body.addEventListener("click", (e) => {
  if (e.target.id == "pauseBtn") {
    alertSong.src = "";
    alertbanner = false;
  }
});
inputForm.addEventListener("submit", addAlert);
alertBtn.addEventListener("click", handleAlertBtn);

controlsContainer.addEventListener("click", setAlert);
