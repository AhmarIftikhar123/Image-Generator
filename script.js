const result_box = document.querySelector(".result_box"),
  search_btn = document.getElementById("search_btn"),
  search_Input = document.getElementById("search_Input"),
  load_more = document.getElementById("load_more");

// keyup fun

window.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (search_Input.value === "") {
      console.error("Input Can't be Blanked");
      return;
    } else {
      getImages();
    }
  }
  if (e.key === "Escape") {
    search_Input.value = "";
  }
});

// Getting Images from ApI
let page = 1;

async function getImages() {
  let access_key = "9BXCC1pwyRJj9xjZcshs0MO5Ny7EummYRSKcghk_XXE";
  let url = `https://api.unsplash.com/search/collections?page=${page}&query=${search_Input.value}&client_id=${access_key}`;
  let response = await fetch(url);
  let data = await response.json();

  console.log(data);
  let Images = data.results;

  Images.map((img) => {
    let image_tag = document.createElement("img");
    image_tag.src = img.cover_photo.urls.small;
    let a = document.createElement("a");
    a.href = img.links.html;
    a.appendChild(image_tag);
    result_box.appendChild(a);
  });
  if(result_box.childElementCount > 0){
      load_more.style.display = "block";
  }
}

let actions = () => {
  if (search_Input.value === "") {
    console.error("Input Can't be Blanked");
    return;
  } else {
    getImages();
  }
};
search_btn.addEventListener("click", () => {
  actions();
});

load_more.onclick = () => {
  actions();
};
