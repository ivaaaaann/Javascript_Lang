interface Container {
  tagName: string;
  className: string;
  children?: string[];
  getTagName: () => string;
  getClassName: () => string;
}

abstract class Shape {
  public static MIN_BORDER_WIDTH = 0;
  public static MAX_BORDER_WIDTH = 30;

  public readonly name: string = "Shape";
  private _borderWidth: number;
  public action!: string;

  constructor(borderWidth: number = 0) {
    this._borderWidth = borderWidth;
  }

  abstract area: () => number;

  set borderWidth(width: number) {
    if (width >= Shape.MAX_BORDER_WIDTH && width <= Shape.MAX_BORDER_WIDTH) {
      this._borderWidth = width;
    } else {
      throw new Error("borderWidth 허용 범위를 벗어난 동작을 시도했습니다.");
    }
  }

  get borderWidth(): number {
    return this._borderWidth;
  }
}

class Circle extends Shape {
  private _radius: number;
  public name: string = "Circle";

  constructor(radius: number) {
    super();
    this._radius = radius;
  }

  get radius() {
    return this.radius;
  }

  area = () => this._radius * this._radius * Math.PI;
}

class Rect extends Shape {
  private _width: number;
  private _height: number;

  constructor(width: number, height: number) {
    super();

    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  area = () => this._width * this._height;
}

const circle = new Circle(50);
const rect = new Rect(150, 200);

console.log(rect.borderWidth);
console.log(rect.name);
console.log(circle.name);

class MyContainer implements Container {
  public tagName: string;
  public className: string;

  constructor(tagName: string, className: string) {
    this.tagName = tagName;
    this.className = className;
  }

  getTagName = () => this.tagName;

  getClassName = () => this.className;
}
