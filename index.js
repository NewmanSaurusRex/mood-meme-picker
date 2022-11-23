import { pupsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);

memeModalCloseBtn.addEventListener("click", closeModal);

getImageBtn.addEventListener("click", renderPup);

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function closeModal() {
  memeModal.style.display = "none";
}

function renderPup() {
  const pupObject = getSinglePupObject();
  memeModalInner.innerHTML = `
        <img 
        class="pup-img" 
        src="./images/${pupObject.image}"
        alt="${pupObject.alt}"
        >
        `;
  memeModal.style.display = "flex";
}

function getSinglePupObject() {
  const pupsArray = getMatchingPupsArray();

  if (pupsArray.length === 1) {
    return pupsArray[0];
  } else {
    const randomNumber = Math.floor(Math.random() * pupsArray.length);
    return pupsArray[randomNumber];
  }
}

function getMatchingPupsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = gifsOnlyOption.checked;

    const matchingPupsArray = pupsData.filter(function (pup) {
      if (isGif) {
        return pup.emotionTags.includes(selectedEmotion) && pup.isGif;
      } else {
        return pup.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingPupsArray;
  }
}

function getEmotionsArray(pups) {
  const emotionsArray = [];
  for (let pup of pups) {
    for (let emotion of pup.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

function renderEmotionsRadios(pups) {
  let radioItems = ``;
  const emotions = getEmotionsArray(pups);
  for (let emotion of emotions) {
    radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(pupsData);
