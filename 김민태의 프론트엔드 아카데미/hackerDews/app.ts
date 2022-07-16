interface Store {
  currentPage: number;
  feeds: NewsFeed[];
}

interface News {
  readonly id: number;
  readonly time_ago: string;
  readonly title: string;
  readonly url: string;
  readonly user: string;
  readonly content: string;
}

interface NewsFeed extends News {
  readonly comments_count: number;
  readonly points: number;
  read?: boolean;
}

interface NewsDetail extends News {
  readonly comments: NewsComment[];
}

interface NewsComment extends News {
  readonly comments: NewsComment[];
  readonly level: number;
}

const rootElement: HTMLElement | null = document.getElementById("root");
let ajax: XMLHttpRequest = new XMLHttpRequest();
const newsUrl = "https://api.hnpwa.com/v0/news/1.json";
const contentUrl = "https://api.hnpwa.com/v0/item/@id.json";
const store: Store = {
  currentPage: 1,
  feeds: [],
};

class Api {
  url: string;
  ajax: XMLHttpRequest;

  constructor(url: string) {
    this.url = url;
    this.ajax = new XMLHttpRequest();
  }

  protected getRequest<AjaxResponse>(): AjaxResponse {
    this.ajax.open("GET", this.url, false);
    this.ajax.send();

    return JSON.parse(this.ajax.response);
  }
}

class NewsFeedApi extends Api {
  getData(): NewsFeed[] {
    return this.getRequest<NewsFeed[]>();
  }
}

class NewsDetailApi extends Api {
  getData(): NewsDetail {
    return this.getRequest<NewsDetail>();
  }
}

const makeFeeds = (feeds: NewsFeed[]): NewsFeed[] => {
  for (let i = 0; i < feeds.length; i++) {
    feeds[i].read = false;
  }

  return feeds;
};

const updateView = (html: string): void => {
  if (rootElement) {
    rootElement.innerHTML = html;
  } else {
    console.error("최상위 컨테이너가 없어서 UI를 진행하지 못합니다");
  }
};

function newsFeed(): void {
  let newsFeeds: NewsFeed[] = store.feeds;

  const api = new NewsFeedApi(newsUrl);

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

  if (newsFeeds.length === 0) {
    newsFeeds = store.feeds = makeFeeds(api.getData());
  }

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    const validNewsFeed: NewsFeed = newsFeeds[i];
    const { id, title, comments_count, user, points, time_ago, read } =
      validNewsFeed;

    newsList.push(`
    <div class="p-6 ${
      read ? "bg-red-500" : "bg-white"
    } mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
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
                <div><i class="fas fa-heart mr-1"></i>${points}</div>
                <div><i class="fas fa-clock mr-1"></i>${time_ago}</div>
            </div> 
        </div>
    </div>   
    `);
  }

  template = template.replace("{{__news_feed__}}", newsList.join(""));
  template = template.replace(
    "{{__prev_page__}}",
    String(store.currentPage > 1 ? store.currentPage - 1 : 1)
  );
  template = template.replace(
    "{{__next_page__}}",
    String(store.currentPage + 1)
  );

  updateView(template);
}

function newsDetail() {
  const id = location.hash.substring(7);
  const api = new NewsDetailApi(contentUrl.replace("@id", id));
  const newsContent: NewsDetail = api.getData();

  const { title, content } = newsContent;

  let template = `
        <div class="bg-gray-600 min-h-screen pb-8">
            <div class="bg-white text-xl">
                <div class="mx-auto px-4">
                    <div class="flex justify-between items-center py-6">
                        <div class="flex justify-start">
                            <h1 class="font-extrabold">Hacker News</h1>
                        </div>
                        <div class="items-center justify-end">
                            <a href="#/page/${store.currentPage}" class="text-gray-500">
                                <i class="fa fa-items"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="h-full border rounded-xl bg-white m-6 p-4">
                <h2>${title}</h2>
                <div class="text-gray-400 h-20">
                    ${content}
                </div>

                {{__comments__}}

            </div>
        </div>
    `;

  for (let i = 0; i < store.feeds.length; i++) {
    if (store.feeds[i].id === Number(id)) {
      store.feeds[i].read = true;
      break;
    }
  }

  updateView(
    template.replace("{{__comments__}}", makeComment(newsContent.comments))
  );
}

function makeComment(comments: NewsComment[]): string {
  const commentString = [];

  for (let i = 0; i < comments.length; i++) {
    const validComment: NewsComment = comments[i];

    commentString.push(`
          <div style="padding-left : ${validComment.level * 40}px" class="mt-4">
              <div class="text-gray-400">
                  <i class="fa fa-sort-up mr-2"></i>
                  <strong>${validComment.user}</strong> ${validComment.time_ago}
              </div>
              <p class="text-gray-700">${validComment.content}</p>
          </div>       
      `);

    if (validComment.comments.length > 0) {
      commentString.push(makeComment(validComment.comments));
    }
  }

  return commentString.join("");
}

function router(): void {
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
