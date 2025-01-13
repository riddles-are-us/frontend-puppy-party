/* This is derived from https://github.com/kennethcachia/shape-shifter */

import { ClipRect } from "./animations/meme";

class Point {
  x: number;
  y: number;
  z: number;
  a: number;
  h: number;
  constructor(x: number, y: number, z: number, a: number, h: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.a = a;
    this.h = h;
  }
}

class Color {
  r: number;
  g: number;
  b: number;
  a: number;
  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
  render() {
    return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
  }
}

export class Effect {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }
  clearFrame() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawCircle(p: Point, c: Color) {
    this.ctx.fillStyle = c.render();
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.z, 0, 2 * Math.PI, true);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

class Dot {
  p: Point;
  e: number;
  s: boolean;
  c: Color;
  t: Point;
  q: Array<Point>;
  constructor(x: number, y: number, z = 5) {
    this.p = new Point(x, y, z, 1, 0);

    this.e = 0.07;
    this.s = true;

    this.c = new Color(219, 147, 248, this.p.a);

    this.t = this.clone();
    this.q = [];
  }
  clone() {
    return new Point(this.p.x, this.p.y, this.p.z, this.p.a, this.p.h);
  }

  _draw(eff: Effect) {
    this.c.a = this.p.a;
    eff.drawCircle(this.p, this.c);
  }

  distanceTo(n: Point) {
    const dx = this.p.x - n.x,
      dy = this.p.y - n.y,
      d = Math.sqrt(dx * dx + dy * dy);
    return [dx, dy, d];
  }

  _moveTowards(n: Point) {
    const details = this.distanceTo(n);
    const dx = details[0];
    const dy = details[1];
    const d = details[2];
    const e = this.e * d;

    if (this.p.h === -1) {
      this.p.x = n.x;
      this.p.y = n.y;
      return true;
    }

    if (d > 1) {
      this.p.x -= (dx / d) * e;
      this.p.y -= (dy / d) * e;
    } else {
      if (this.p.h > 0) {
        this.p.h--;
      } else {
        return true;
      }
    }

    return false;
  }

  _update() {
    let p, d;

    if (this._moveTowards(this.t)) {
      p = this.q.shift();

      if (p) {
        this.t.x = p.x || this.p.x;
        this.t.y = p.y || this.p.y;
        this.t.z = p.z || this.p.z;
        this.t.a = p.a || this.p.a;
        this.p.h = p.h || 0;
      } else {
        if (this.s) {
          this.p.x -= Math.sin(Math.random() * 3.142);
          this.p.y -= Math.sin(Math.random() * 3.142);
        } else {
          this.move(
            new Point(
              this.p.x + Math.random() * 50 - 25,
              this.p.y + Math.random() * 50 - 25,
              0,
              0,
              0
            ),
            false
          );
        }
      }
    }

    d = this.p.a - this.t.a;
    this.p.a = Math.max(0.1, this.p.a - d * 0.05);
    d = this.p.z - this.t.z;
    this.p.z = Math.max(1, this.p.z - d * 0.05);
  }

  move(p: Point, avoidStatic: boolean) {
    if (!avoidStatic || (avoidStatic && this.distanceTo(p)[2] > 1)) {
      this.q.push(p);
    }
  }

  render(eff: Effect) {
    this._update();
    this._draw(eff);
  }
}

export class ShapeBuilder {
  context: CanvasRenderingContext2D;
  fontSize: number;
  fontFamily: string;
  canvas: HTMLCanvasElement;
  shape: Shape;

  constructor(text: string) {
    const shapeCanvas = document.createElement("canvas");
    const shapeContext = shapeCanvas.getContext("2d")!;
    this.fontSize = 150;
    this.fontFamily = "Avenir, Helvetica Neue, Helvetica, Arial, sans-serif";
    shapeCanvas.width = 800;
    shapeCanvas.height = 500;
    shapeContext.fillStyle = "red";
    shapeContext.textBaseline = "middle";
    shapeContext.textAlign = "center";
    this.context = shapeContext;
    this.canvas = shapeCanvas;
    this.shape = this.processText(text);
  }

  renderText(text: string, eff: Effect, fast: boolean) {
    const newShape = this.processText(text);
    let size;
    const a = { w: eff.width, h: eff.height };
    let d = 0;

    this.shape.width = newShape.width;
    this.shape.height = newShape.height;

    this.shape.compensate(eff);

    if (newShape.dots.length > this.shape.dots.length) {
      size = newShape.dots.length - this.shape.dots.length;
      for (let d = 1; d <= size; d++) {
        this.shape.dots.push(new Dot(a.w / 2, a.h / 2));
      }
    }

    d = 0;
    while (newShape.dots.length > 0) {
      const i = Math.floor(Math.random() * newShape.dots.length);
      this.shape.dots[d].e = fast ? 0.25 : this.shape.dots[d].s ? 0.14 : 0.11;

      if (this.shape.dots[d].s) {
        this.shape.dots[d].move(new Point(0, 0, 5, Math.random(), 18), false);
      } else {
        this.shape.dots[d].move(
          new Point(0, 0, Math.random() * 5 + 5, 0, fast ? 18 : 30),
          false
        );
      }

      this.shape.dots[d].s = true;
      this.shape.dots[d].move(
        new Point(
          newShape.dots[i].p.x + this.shape.cx,
          newShape.dots[i].p.y + this.shape.cy,
          4,
          5,
          0
        ),
        false
      );

      newShape.dots = newShape.dots
        .slice(0, i)
        .concat(newShape.dots.slice(i + 1));
      d++;
    }

    for (let i = d; i < this.shape.dots.length; i++) {
      if (this.shape.dots[i].s) {
        this.shape.dots[i].move(new Point(0, 0, 5, Math.random(), 20), false);

        this.shape.dots[i].s = false;
        this.shape.dots[i].e = 0.04;
        this.shape.dots[i].move(
          new Point(
            Math.random() * a.w,
            Math.random() * a.h,
            0.3,
            Math.random() * 4,
            0
          ),
          false
        );
      }
    }
  }

  renderImage(image: HTMLImageElement, rect: ClipRect, eff: Effect) {
    const newShape = this.processImage(image, rect);

    this.shape.width = newShape.width;
    this.shape.height = newShape.height;

    this.shape.compensate(eff);

    this.shape.dots = [];
    for (let i = 0; i < newShape.dots.length; i++) {
      this.shape.dots.push(
        new Dot(
          newShape.dots[i].p.x + this.shape.cx,
          newShape.dots[i].p.y + this.shape.cy,
          2
        )
      );
    }

    for (let d = 0; d < this.shape.dots.length; d++) {
      this.shape.dots[d].render(eff);
    }
  }

  render(eff: Effect) {
    for (let d = 0; d < this.shape.dots.length; d++) {
      this.shape.dots[d].render(eff);
    }
  }

  private processText(l: string) {
    let s = 0;
    this.setFontSize(this.fontSize);
    s = Math.min(
      this.fontSize,
      (this.canvas.width / this.context.measureText(l).width) *
        0.8 *
        this.fontSize,
      (this.canvas.height / this.fontSize) *
        (this.isNumber(l) ? 1 : 0.45) *
        this.fontSize
    );
    this.setFontSize(s);

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillText(l, this.canvas.width / 2, this.canvas.height / 2);

    return this.processCanvas(10);
  }

  private processImage(image: HTMLImageElement, rect: ClipRect) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(
      image,
      rect.left,
      rect.top,
      200,
      200,
      0,
      0,
      150,
      150
    );
    return this.processCanvas(5);
  }

  private processCanvas(gap: number): Shape {
    const pixels = this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    ).data;
    const dots = [];
    let x = 0;
    let y = 0;
    let fx = this.canvas.width;
    let fy = this.canvas.height;
    let w = 0;
    let h = 0;
    for (let p = 0; p < pixels.length; p += 4 * gap) {
      if (pixels[p + 3] > 0) {
        dots.push(new Dot(x, y));

        w = x > w ? x : w;
        h = y > h ? y : h;
        fx = x < fx ? x : fx;
        fy = y < fy ? y : fy;
      }

      x += gap;

      if (x >= this.canvas.width) {
        x = 0;
        y += gap;
        p += gap * 4 * this.canvas.width;
      }
    }

    return new Shape(dots, w + fx, h + fy);
  }

  private setFontSize(s: number) {
    this.context.font = "bold " + s + "px " + this.fontFamily;
  }

  private isNumber(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}

class Shape {
  dots: Array<Dot>;
  width: number;
  height: number;
  cx: number;
  cy: number;

  constructor(dots: Array<Dot>, width: number, height: number) {
    this.dots = dots;
    this.width = width;
    this.height = height;
    this.cx = 0;
    this.cy = 0;
  }

  compensate(eff: Effect) {
    const w = eff.width;
    const h = eff.height;

    this.cx = w / 2 - this.width / 2;
    this.cy = h / 2 - this.height / 2;
  }
}
