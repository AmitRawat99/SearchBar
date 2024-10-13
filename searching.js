
let searchHere = document.querySelector(".search-here");
let searchBox = document.getElementById("search-box");
let searchResult = document.querySelector(".search-result");
let showMore = document.getElementById("show-More");
let searchBtn = document.getElementById("search-btn");
let boxes = document.getElementById("box");

let currentPage = 1;
let currentQuery = ""

async function feching(APIS , page = 1) {
  let API = `https://api.unsplash.com/search/photos?page=${page}&query=${APIS}&client_id=YY5gV_kiM4GdqyNaY7QtFjmxiD_ceDVe6HmmZzAqZEI`;
  try {
    let Response = await fetch(API);
    console.log(Response);

    let Data = await Response.json();
    console.log(Data);

    if (Data.results && Data.results.length > 0) {
      displayImage(Data.results);
    } else {
      alert("No Retrun Result");
    }
  } catch (Error) {
    console.log("API Feching Problme");
  }
}


function displayImage(images) {
  images.forEach((img) => {
    let imageElement = document.createElement("img");
    let boxes = document.createElement("div");
    boxes.classList.add("boxes");

    imageElement.classList.add("feching-img");
    imageElement.src = img.urls.small;
    imageElement.alt = "Image From Unsplash";
    boxes.appendChild(imageElement);
    searchResult.appendChild(boxes);
    searchResult.style.margin = '30px 0'
    boxes.appendChild(imageElement)
  });
  showMore.style.display = 'block'
}


searchBtn.addEventListener("click", function () {
  let query = searchBox.value.trim();
  if (query === "") {
    alert("Write A Something Text");
  } else {
    currentQuery = query;
    currentPage = 1;
    searchResult.innerHTML = ''
    feching(currentQuery, currentPage);
  }
});


showMore.addEventListener('click',function(){
  currentPage++;
  feching(currentQuery, currentPage);
})