const container = document.querySelector(".container");
const searchQuery = document.querySelector(".search-input");
const totalCount = document.querySelector(".total-count");
const filteredCount = document.querySelector(".filtered-count");
const favouriteContainer = document.querySelector(".favourite-container");

let apiData = [];

//fetching data on first call
fetch("https://akhil-06.github.io/emoji_project/emojiList.js")
  .then(async (response) => {
    return await response.text();
  })
  .then((data) => {
    data = data.slice(18, -1);
    data = JSON.parse(data);
    apiData = data;
    totalCount.innerHTML = filteredCount.innerHTML = apiData.length;
    fillData();
  })
  .catch((error) => {
    console.error("Error:", error);
  });

//triggers when search field is changed
searchQuery.addEventListener("keyup", (e) => {
  e.preventDefault();
  fillData();
});

//filling whole data
const fillData = () => {
  let search = searchQuery.value;

  let filteredData = apiData.filter((data) => {
    if (data.description.indexOf(search) != -1) {
      return true;
    }
    if (data.aliases.some((e) => e.startsWith(search))) {
      return true;
    }
    if (data.tags.some((e) => e.startsWith(search))) {
      return true;
    }
  });

  container.innerHTML = "";
  filteredCount.innerHTML = filteredData.length;
  filteredData.forEach((e) => {
    const emoji = e.emoji;
    const desc = e.description;
    const aliases = e.aliases.join(", ");

    const singleEmoji = document.createElement("div");
    singleEmoji.className = "emoji-card";
    //putting emoji inside div
    const emojiContainer = document.createElement("div");
    emojiContainer.className = "emoji-container";
    emojiContainer.innerText = emoji;
    singleEmoji.append(emojiContainer);

    //putting aliases
    const aliasesConatiner = document.createElement("div");
    aliasesConatiner.className = "aliases-container";
    aliasesConatiner.innerText = aliases.replaceAll("_", " ");
    singleEmoji.append(aliasesConatiner);

    //desc container
    const descConatiner = document.createElement("div");
    descConatiner.className = "desc-container";

    const favourite = document.createElement("div");
    favourite.className = "favourite-icon fa-regular fa-heart fa-lg";
    favourite.style.color = "red";

    const descText = document.createElement("div");
    descText.className = "desc-text";
    descText.innerText = desc;

    descConatiner.appendChild(descText);
    descConatiner.appendChild(favourite);

    singleEmoji.append(descConatiner);

    container.append(singleEmoji);
  });

  //Adding event listener for favourite icons
  const emojiCardAll = document.querySelectorAll(".emoji-card");
  emojiCardAll.forEach((data, index) => {
    const favouriteClass = emojiCardAll[index].querySelector(".favourite-icon");

    const emoji =
      emojiCardAll[index].querySelector(".emoji-container").innerHTML;

    const aliases =
      emojiCardAll[index].querySelector(".aliases-container").innerHTML;

    favouriteClass.addEventListener("click", (e) => {
      console.log("Clicked on icon");
      e.preventDefault();
      if (
        favouriteClass.className === "favourite-icon fa-solid fa-heart fa-lg"
      ) {
        favouriteClass.className = "favourite-icon fa-regular fa-heart fa-lg";

        const allFavourite = document.querySelectorAll(".favourite-emoji-card");
        console.log(allFavourite);
        allFavourite.forEach((e, indexx) => {
          console.log(
            allFavourite[indexx].getAttribute("data-index"),
            "and outer index = ",
            index
          );
          if (allFavourite[indexx].getAttribute("data-index") == index) {
            allFavourite[indexx].style.display = "none";
          }
        });
      } else {
        favouriteClass.className = "favourite-icon fa-solid fa-heart fa-lg";

        const singleEmoji = document.createElement("div");
        singleEmoji.className = "favourite-emoji-card";
        singleEmoji.setAttribute("data-index", index);
        //putting emoji inside div
        const emojiContainer = document.createElement("div");
        emojiContainer.className = "favourite-emoji-container";
        emojiContainer.innerText = emoji;
        singleEmoji.append(emojiContainer);

        //putting aliases
        const aliasesConatiner = document.createElement("div");
        aliasesConatiner.className = "favourite-aliases-container";
        aliasesConatiner.innerText = aliases;
        singleEmoji.append(aliasesConatiner);

        favouriteContainer.append(singleEmoji);
      }
    });
  });
};
