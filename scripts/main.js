document.addEventListener("DOMContentLoaded", async function () {
  let articleList = document.getElementById("article-list");

  let rootFolder;

  switch (document.location.hostname) {
    case "wongena.github.io":
      rootFolder = "/artful-designs/source/text/all_items.json";
      break;
    default:
      rootFolder = "/../source/text/all_items.json";
      break;
  }

  let articleData = await fetch(rootFolder).then((response) => response.json());

  articleData.forEach((element) => {
    let articleItem = document.createElement("article");
    articleItem.classList.add("article-item", "flex");
    articleItem.innerHTML = `
      <img src="${element.imagePath}" alt="${element.name}" />
      <div class="flex flex-col items-start">
        <h3>${element.name}</h3>
        <p>$ <i>${element.price.toFixed(2)}</i></p>
      </div>
    `;
    articleList.appendChild(articleItem);
  });
});

document.getElementById("search-field").addEventListener("input", function () {
  let query = this.value.toLowerCase();
  let articles = document.querySelectorAll(".article-item");
  let found = false;

  articles.forEach((article) => {
    let name = article.querySelector("h3").innerText.toLowerCase();
    if (name.includes(query)) {
      article.style.display = "flex";
      found = true;
    } else {
      article.style.display = "none";
    }
  });

  let infoParagraph = document.getElementById("no-results-info");
  if (!infoParagraph) {
    infoParagraph = document.createElement("p");
    infoParagraph.id = "no-results-info";
    infoParagraph.style.display = "none";
    document.getElementById("article-list").appendChild(infoParagraph);
  }

  infoParagraph.textContent =
    "We could not find any items containing the search term: " + query;
  infoParagraph.style.display = found ? "none" : "block";
});

document.getElementById("search-button").addEventListener("click", function () {
  document
    .getElementById("article-list")
    .scrollIntoView({ behavior: "smooth" });
});
