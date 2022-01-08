const playBtn = document.getElementById("start-btn");
const clearBtn = document.getElementById("clear-btn");
const pasteContainer = document.getElementById("paste-container");
const voiceSelect = document.getElementById("voice-select");
const volumeSlider = document.getElementById("volume-range");
const rateSlider = document.getElementById("rate-range");
let selectedVolumeRange = 1;
let selectedVoice;
let selectedRateRange = 1;

// avoid speaking after reload
window.onbeforeunload = () => {
  speechSynthesis.cancel();
};

//play btn
playBtn.addEventListener("click", () => {
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
    setTimeout(() => {
      playBtn.innerHTML = "Resume";
    }, 500);
  } else if (speechSynthesis.speak && speechSynthesis.paused) {
    speechSynthesis.resume();
    setTimeout(() => {
      playBtn.innerHTML = "Pause";
    }, 500);
  } else {
    const msg = new SpeechSynthesisUtterance();
    msg.text = pasteContainer.value;
    msg.voice = selectedVoice;
    msg.volume = selectedVolumeRange;
    msg.rate = selectedRateRange;
    speechSynthesis.speak(msg);
    setTimeout(() => {
      playBtn.innerHTML = "Pause";
    }, 500);
  }
});

speechSynthesis.onend = function () {};

//clear btn functionality
clearBtn.addEventListener("click", () => {
  StopSpekaing();
});

// functin to stop speaking
function StopSpekaing() {
  pasteContainer.value = "";
  speechSynthesis.cancel();
}

//on getting the voices call populateVoiceList()
let voices = [];
speechSynthesis.addEventListener("voiceschanged", () => {
  voices = speechSynthesis.getVoices();
  populateVoiceList();
});

//function to add voice options to the website
function populateVoiceList() {
  for (let i = 0; i < voices.length; i++) {
    let option = document.createElement("option");
    option.textContent = voices[i].name;

    if (voices[i].default) {
      option.textContent;
    }
    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
}

// selection of voice
voiceSelect.addEventListener("change", () => {
  speechSynthesis.cancel();
  let selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
  for (i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      selectedVoice = voices[i];
    }
  }
});

// adjust voice
volumeSlider.addEventListener("change", () => {
  selectedVolumeRange = volumeSlider.value / 100;
  speechSynthesis.cancel();
});

// adjust rate
rateSlider.addEventListener("change", () => {
  selectedRateRange = rateSlider.value / 100;
  speechSynthesis.cancel();
});

//changes in pasted channel
pasteContainer.addEventListener("change", () => {
  speechSynthesis.cancel();
});



//javascript for pwa
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/service-worker.js');
} else {
  console.log("Service worker is not supported");
}
