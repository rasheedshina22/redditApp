const search = require("./redditApi");

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (e) => {
  //get searchTerm

  const searchTerm = searchInput.value;
  //get sortBy
  const sortBy = document.querySelector('input[type="radio"]:checked').value;
  //get searchLimit
  const searchLimit = document.getElementById("limit").value;

  //add validation
  if (searchTerm == "") {
    showMessage("please add a search term ", "alert-danger");
  }

  //clear the input after submit
  searchInput.value = "";

  //search reddit
  search(searchTerm, sortBy, searchLimit).then(results => {
    let output = '<div class="card-columns">';
    results.forEach(result => {
      //check for image
      //if there is a result. preview then image will be result.preview.image[0].source.url;
      const image = result.preview
        ? result.preview.images[0].source.url
        : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
      output += `
          <div class="card">
          <img src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${result.title}</h5>
            <p class="card-text">${truncateText(result.selftext, 100)}</p>
            <a href="${
              result.url
            }" target="_blank" class="btn btn-primary"> Read More </a>
            <hr/>
            <span class="badge badge-secondary">Subreddit: ${result.subreddit}
            </span>
            <span class="badge badge-dark">Score: ${result.score}</span>
          </div>
        </div>

            `;
    });

    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });

  e.preventDefault();
});

//validation Function
function showMessage(message, className) {
  //create the div
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  //add the text
  div.appendChild(document.createTextNode(message));
  //get the parent container
  const searchContainer = document.getElementById("search-container");
  //get the div to insert it before
  const searchElement = document.getElementById("search");
  //insert the message
  searchContainer.insertBefore(div, searchElement);

  //setTimeout for the function
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}

//Truncate Text
function truncateText(text, limit) {
  const shortened = text.indexOf(" ", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
