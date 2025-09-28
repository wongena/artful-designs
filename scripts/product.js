document.addEventListener("DOMContentLoaded", async function () {
  let params = new URLSearchParams(document.location.search);
  let articleId = parseInt(params.get("id"));

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
  let article = articleData.find((item) => item.id === articleId);

  if (!article || !articleId) {
    window.location.href = "index.html";
    return;
  }

  const main = document.querySelector("main");
  main.innerHTML = `
    <img src="${article.imagePath}" alt="${article.title}" />
      <div>
        <h2>${article.name}</h2>
        <p class="product-price">$ <i>${article.price}</i></p>
      </div>
  `;
});
