import { NewsDetail, NewsFeed } from "../types";

export class Api {
  xhr: XMLHttpRequest;
  url: string;

  constructor(url: string) {
    this.url = url;
    this.xhr = new XMLHttpRequest();
  }

  async request<AjaxResponse>(): Promise<AjaxResponse> {
    const response = await fetch(this.url);
    return (await response.json()) as AjaxResponse;
  }
}

export class NewsFeedApi extends Api {
  constructor(url: string) {
    super(url);
  }

  getData(): Promise<NewsFeed[]> {
    return this.request<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  constructor(url: string) {
    super(url);
  }

  getData(): Promise<NewsDetail> {
    return this.request<NewsDetail>();
  }
}
