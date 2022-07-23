import { contentUrl, newsUrl } from "../config";
import { NewsDetail, NewsFeed } from "../types";

export class Api {
  getRequest<AjaxResponse>(url: string): AjaxResponse {
    const ajax = new XMLHttpRequest();

    ajax.open("GET", url, false);
    ajax.send();

    return JSON.parse(ajax.response);
  }
}

export class NewsFeedApi extends Api {
  getData(): NewsFeed[] {
    return this.getRequest<NewsFeed[]>(newsUrl);
  }
}

export class NewsDetailApi extends Api {
  getData(id: string): NewsDetail {
    return this.getRequest<NewsDetail>(contentUrl.replace("@id", id));
  }
}
