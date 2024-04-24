const container = document.querySelector(".container");

fetch("https://akhil-06.github.io/emoji_project/emojiList.js")
  .then(async (response) => {
    // Check if the response is successful
    if (response.ok) {
      // Try to parse the response body as JSON
      return await response.text();
    } else {
      // Handle errors
      throw new Error("Error fetching data");
    }
  })
  .then((data) => {
    // Handle the fetched data
    data = data.slice(18, -1);
    data = JSON.parse(data);
    data.forEach((e) => {
      const emoji = e.emoji;
      const desc = e.description;
      const aliases = e.aliases[0];
      const tags = e.tags;
      console.log(tags);
      console.log(aliases);
      console.log(emoji);
      console.log(desc);

      const singleEmoji = document.createElement("div");
      //putting emoji inside div
      const emojiContainer = document.createElement("p");
      emojiContainer.innerText = emoji;
      singleEmoji.append(emojiContainer);

      //putting aliases

      const aliasesConatiner = document.createElement("p");
      aliasesConatiner.innerText = aliases;
      singleEmoji.append(aliasesConatiner);

      //desc container

      const descConatiner = document.createElement("p");
      descConatiner.innerText = desc;
      singleEmoji.append(descConatiner);

      container.append(singleEmoji);
    });
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error("Error:", error);
  });
