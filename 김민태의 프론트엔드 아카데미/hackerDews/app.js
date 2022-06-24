let ajax = new XMLHttpRequest();
const rootElement = document.getElementById("root");
const content = document.createElement("div");
const newsUrl = "https://api.hnpwa.com/v0/news/1.json";
const contentUrl = "https://api.hnpwa.com/v0/item/@id.json";
const store = {
  currentPage: 1,
};

const ajaxRequester = (url) => {
  ajax.open("GET", url, false);
  ajax.send();
  return JSON.parse(ajax.response);
};

function newsFeed() {
  const newsFeeds = ajaxRequester(newsUrl);
  const newsList = [];
  newsList.push("<ul>");

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    const validNewsFeed = newsFeeds[i];

    newsList.push(`
    <li>
        <a href="#/show/${validNewsFeed.id}">
            ${validNewsFeed.title} (${validNewsFeed.comments_count})
        </a>
    </li>
    `);
  }

  newsList.push("</ul>");

  newsList.push(`
    <div>
        <a href="#/page/${
          store.currentPage > 1 ? store.currentPage - 1 : 1
        }">이전 페이지</a>
        <a href="#/page/${
          store.currentPage > 3 ? store.currentPage + 1 : 3
        }">다음 페이지</a>
    </div>
  `);

  rootElement.innerHTML = newsList.join("");
}

function newsDetail() {
  const id = location.hash.substring(7);
  const newsContent = ajaxRequester(contentUrl.replace("@id", id));

  rootElement.innerHTML = `
      <h1>${newsContent.title}</h1>
      
      <div>
          <a href="#/page/${store.currentPage}">목록으로</a>
      </div>
    `;
}

function router() {
  const routePath = location.hash;

  if (routePath === "") {
    newsFeed();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substring(7));
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener("hashchange", router);

router();
