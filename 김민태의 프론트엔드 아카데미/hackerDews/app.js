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
  let template = `
    <div class="bg-gray-600 min-h-screen">
        <div class="bg-white text-xl">
            <div class="mx-auto px-4">
                <div class="flex justify-between items-center py-6">
                    <div class="flex justify-start">
                        <h1 class="font-extrabold">Hacker Dews</h1>
                    </div>
                    <div class="items-center justify-end">
                        <a href="#/page/{{__prev_page__}}" class="text-gray-500">
                            Previous
                        </a>
                        <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
                            Next
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-4 text-2xl text-gray-700">
            {{__news_feed__}}
        </div>
    </div>
  `;

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    const validNewsFeed = newsFeeds[i];
    const { id, title, comments_count, user, people, time_ago } = validNewsFeed;

    newsList.push(`
    <div class="p-6 bg-white mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
        <div class="flex">
            <div class="flex-auto">
                <a href="#/show/${id}">
                    ${title}
                </a>
            </div>
            <div class="text-center text-sm">
                <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${comments_count}</div>
            </div>
        </div>
        <div class="flex mt-3">
            <div class="grid grid-cols-3 text-sm text-gray-500">
                <div><i class="fas fa-user mr-1"></i>${user}</div>
                <div><i class="fas fa-heart mr-1"></i>${people}</div>
                <div><i class="fas fa-clock mr-1"></i>${time_ago}</div>
            </div> 
        </div>
    </div>   
    `);
  }

  template = template.replace("{{__news_feed__}}", newsList.join(""));
  template = template.replace(
    "{{__prev_page__}}",
    store.currentPage > 1 ? store.currentPage - 1 : 1
  );
  template = template.replace(
    "{{__next_page__}}",
    store.currentPage > 3 ? store.currentPage + 1 : 3
  );

  rootElement.innerHTML = template;
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
