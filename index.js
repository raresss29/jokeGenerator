const button = document.getElementById("button");
const jokeDiv = document.getElementById("jokeDiv");

function renderJoke(joke) {
  jokeDiv.textContent = joke;
}

function voicedJoke(joke) {
  VoiceRSS.speech({
    key: "5ff4b1b6ab8143f488a977bc3a2f2a9c",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJoke() {
  const url =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  let joke = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
  } catch (e) {}

  renderJoke(joke);
  voicedJoke(joke);
}

button.addEventListener("click", getJoke);
