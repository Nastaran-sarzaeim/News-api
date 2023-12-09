// listener
listener();
function listener() {
  document.querySelector("#submitBtn").addEventListener("click", searchNews);
}

// functions
//get api
async function getApi(search, country, category, language) {
  const apiKey = "4b05b9f6f88d45139df253ba70b965cc";
  let url = "https://newsapi.org/v2/";
  if (country === "" && category === "" && language === "") {
    url += "everything?";
  } else {
    url += "top-headlines?";
  }

  if (search !== "") {
    url += `q=${search}&`;
  }
  if (country !== "") {
    url += `country=${country}&`;
  }
  if (category !== "") {
    url += `category=${category}&`;
  }
  if (language !== "") {
    url += `language=${language}&`;
  }
  url += `apiKey=${apiKey}`;
  const response = await fetch(url);
  const news = await response.json();
  return { news };
}

//error message
function errorMessage(message, className) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(message));
  div.className = className;
  document.querySelector("#message").appendChild(div);
  setTimeout(() => {
    this.removeError();
  }, 3000);
}

//remove error message
function removeError() {
  const alert = document.querySelector(".alert");
  alert.remove();
}

//show news in ui
function showNews(news) {
  const prevResult = document.querySelector("#result > div");
  if (prevResult) {
    prevResult.remove();
  }
  const result = document.querySelector("#result");
  news.forEach((newsInfo) => {
    result.innerHTML += `<div class="col-md-4 mb-4">
                          <div class="card">
                              <div class="card-body" >
                                  <h2 class="text-center">${newsInfo.title.split(
                                    "-",
                                    1
                                  )}</h2>
                                  <img src="${
                                    (newsInfo.urlToImage !== null) ? newsInfo.urlToImage : ""
                                  }" class="card-img-top">
                                  <p class="card-text lead textto-info mt-4"><b>news information : </b>${
                                    (newsInfo.description !== null) ? newsInfo.description : "There is no description" 
                                  }</p>
                                  <span class="badge bg-primary ">Source : ${
                                    newsInfo.source.name
                                  }</span>
                                  <br>
                                  <span class="badge bg-primary ">Date & Time : ${
                                    newsInfo.publishedAt
                                  }</span>
                                  <br>
                                  <span class="badge bg-primary ">Author :${
                                    newsInfo.author
                                  }</span>
                                  <br> <br>

                                  <div>
                                  <a href="${
                                    newsInfo.url
                                  }" target="_blank" class="btn btn-block btn-light">
                                  Complete News <img src="./img/arrow-right.svg"></a>
                                  
                                  </div>

                              </div>
                          </div>
      </div>`;
  });
}

// search news
function searchNews(e) {
  e.preventDefault();
  const search = document.querySelector("#news-name").value;
  const country = document.querySelector("#country").value;
  const category = document.querySelector("#category").value;
  const language = document.querySelector("#language").value;

  if (search !== "" || country !== "" || category !== "") {
    getApi(search, country, category, language).then((news) => {
      const newsArray = news.news.articles;
      if (newsArray.length > 0) {
        showNews(newsArray);
      } else {
        errorMessage(
          "There isn't any news with your filtering",
          "alert alert-danger text-center m-4"
        );
      }
    });
  } else {
    errorMessage(
      "Please enter atleast one parameter",
      "alert alert-danger text-center m-4"
    );
  }
}
