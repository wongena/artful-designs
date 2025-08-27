document.addEventListener("DOMContentLoaded", async function () {
  let articleList = document.getElementById("article-list");
  let articleData = await fetch("../source/text/all_items.json").then(
    (response) => response.json()
  );

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

  articles.forEach((article) => {
    let name = article.querySelector("h3").innerText.toLowerCase();
    if (name.includes(query)) {
      article.style.display = "flex";
    } else {
      article.style.display = "none";
    }
  });
});

document.getElementById("search-button").addEventListener("click", function () {
  document
    .getElementById("article-list")
    .scrollIntoView({ behavior: "smooth" });
});
