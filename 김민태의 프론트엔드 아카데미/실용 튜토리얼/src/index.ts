import { AnyObject } from "./types/common";

declare global {
  interface Window {
    Handlebars: {
      complie: (template: string) => (data: AnyObject) => string;
    };
    daum: any;
  }
}

const app = new AudioParamMap("#root", {
  title: "Signup",
});

app.render();
