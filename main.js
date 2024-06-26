const itemRow = document.querySelectorAll(".itemRow");
const matchedPairs = document.querySelector("#pairs");
const allPairs = document.querySelector("#allPairs");
const totalMoves = document.querySelector("#moves");
const resetGame = document.querySelector("#reset");
const endGame = document.querySelector("#endGame");

let imgArr = [
  "./images/bee.png",
  "./images/bird.png",
  "./images/cat.png",
  "./images/owl.png",
  "./images/octopus.png",
  "./images/sheep.png",
  "./images/teddy.png",
  "./images/angel.png",
  "./images/bee.png",
  "./images/bird.png",
  "./images/cat.png",
  "./images/owl.png",
  "./images/octopus.png",
  "./images/sheep.png",
  "./images/teddy.png",
  "./images/angel.png",
];

let arr = [];
let count = 0;
let moves = 0;
let pairs = 0;
let stop = false;
let rowCount = 0;

for (let i = 0; i < 16; i++) {
  if (i !== 0 && i % 4 === 0) rowCount++;

  const randomItem = Math.floor(Math.random() * imgArr.length);
  const item = showImages(imgArr[randomItem]);
  itemRow[rowCount].append(item);
  imgArr.splice(randomItem, 1);
}

const itemDiv = document.querySelectorAll(".itemDiv");

function showImages(url) {
  const div = document.createElement("div");
  div.setAttribute(
    "class",
    "h-full w-full flex justify-center items-center bg-gray-200 rounded itemDiv cursor-pointer"
  );
  const image = document.createElement("img");
  image.setAttribute("class", "w-[100%] h-[100%] invisible");
  image.src = url;
  div.append(image);
  return div;
}

const showItem = (e) => {
  if (!stop && e.target.localName !== "img" && count < 2) {
    e.target.children[0].classList.add("show-visibility");
    count++;
    arr.push(e.target.children[0]);
    if (count === 2) {
      setTimeout(() => {
        if (arr[0].src === arr[1].src) {
          arr[0].style.opacity = "0.5";
          arr[1].style.opacity = "0.5";
          arr[0].style.cursor = "not-allowed";
          arr[1].style.cursor = "not-allowed";
          pairs++;
          matchedPairs.innerHTML = pairs;
          if (pairs === 8) {
            matchedPairs.style.color = "green";
            allPairs.style.color = "green";
          }
        } else {
          arr[0].classList.remove("show-visibility");
          arr[1].classList.remove("show-visibility");
        }
        moves++;
        arr = [];
        count = 0;
        totalMoves.innerHTML = moves;
      }, 1000);
    }
  }
};

itemDiv.forEach((item) => {
  item.setAttribute("onclick", "showItem(event)");
});

resetGame.addEventListener("click", () => {
  location.reload();
});

endGame.addEventListener("click", () => {
  stop = true;
});
