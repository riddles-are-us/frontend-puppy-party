import {
  HEIGHT, WIDTH,
}  from "../draw";
import { MemeData, MemeProp } from "../season";

import spirites from "../spirite";

export class ClipRect {
  top: number;
  left: number;
  right: number;
  bottom: number;
  constructor(top: number, left: number, right: number, bottom: number) {
    this.top = top;
    this.left = left;
    this.right = right;
    this.right = right;
    this.bottom = bottom;
  }
}

export class Clip {
  index: number;
  name: string;
  src: HTMLImageElement;
  top: number;
  left: number;
  vx: number;
  vy: number;
  boundry: ClipRect;
  clips: Map<string, Array<ClipRect>>;
  currentFrame: number | null;
  currentClip: string | null;
  ratio: number;
  focus: boolean;
  hover: boolean;
  target: Array<[number, number]>;
  constructor(index: number, src: HTMLImageElement, boundry: ClipRect, ratio: number) {
    this.index = index;
    this.name = "NPC";
    this.src = src;
    this.boundry = boundry;
    this.vx = 0;
    this.vy = 0;
    this.top = 0;
    this.left = 0;
    this.currentFrame = null;
    this.currentClip = null;
    this.clips = new Map<string, Array<ClipRect>>();
    this.ratio = ratio;
    this.focus = false;
    this.hover = false;
    this.target = [];
  }

  inRect(cursorLeft: number, cursorTop: number): boolean {
    const rect = this.clips.get(this.currentClip!)![this.currentFrame!];
    const w = rect.right-rect.left;
    const bottom = this.top + w * this.ratio;
    const right = this.left + w * this.ratio;
    const margin = w * this.ratio / 4;
    if (cursorLeft > this.left + margin
      && cursorLeft < right - margin
      && cursorTop > this.top + margin
      && cursorTop < bottom) {
      return true;
    }
    return false;
  }

  select() {
    this.focus = true;
  }

  disSelect() {
    this.focus = false;
  }

  getBottom() {
    if (this.currentClip != null && this.currentFrame != null) {
      const rect = this.clips.get(this.currentClip)![this.currentFrame];
      return this.top + (rect.bottom - rect.top);
    }
    else {
      return 0;
    }
  }

  getZCenter() {
    if (this.currentClip != null && this.currentFrame != null) {
      const rect = this.clips.get(this.currentClip)![this.currentFrame];
      const w = rect.right-rect.left;
      return [this.left + this.ratio * w/2, this.top + this.ratio*w]
    }
    else {
      return null;
    }
  }


  setSpeed(ratio: number) {
    const rx = 2 * Math.random() - 1;
    const ry = Math.sign(rx) * Math.sqrt(1 - rx*rx);
    if (this.target.length == 0) {
      this.vx = rx * ratio;
      this.vy = ry * ratio;
    } else {
      const len = this.target.length - 1;
      let rx = this.target[len][0] - this.left;
      let ry = this.target[len][1] - this.top;
      if (Math.abs(rx) > 10) {
        rx = Math.sign(rx) * 10;
      }
      if (Math.abs(ry) > 10) {
        ry = Math.sign(ry) * 10;
      }
      this.vx = rx;
      this.vy = ry;
      if (rx*rx + ry*ry < 5) {
        //this.target.pop();
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, memes: MemeProp[]) {
    if (this.currentClip != null && this.currentFrame != null) {
      //Set the fill color
      const rect = this.clips.get(this.currentClip)![this.currentFrame];
      const w = rect.right-rect.left;
      const h = rect.bottom - rect.top;
      ctx.drawImage(this.src, rect.left, rect.top, w, h, this.left, this.top, w * this.ratio, w * this.ratio);

      if (this.focus == true) {
        ctx.fillStyle = "orange";  // Red color
      } else {
        ctx.fillStyle = "black";  // Red color
      }

      const rank = memes[this.index].model.rank;
      const fullname = `${this.name}:${rank}`;
      {
        ctx.fillRect(this.left + 30, this.top - 13, fullname.length * 7 + 5, 15);
        ctx.fillStyle = "white";  // Red color
        ctx.font = "12px Arial";
        ctx.fillText(fullname, this.left+35, this.top); // text, x, y
      }
      if (this.hover == true) {
        //ctx.fillStyle = 'hsl(20%, 100%, 15%)'; // Use 50% gray to desaturate
        //ctx.globalCompositeOperation = "saturation";
        ctx.beginPath();
        ctx.arc(this.left + 50, this.top + 50, 50, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.setLineDash([10, 5]); // Dash of 10px and gap of 5px
        ctx.strokeStyle = 'purple'; // Color of the dashed circle
        ctx.lineWidth = 2;        // Thickness of the dashed line
        ctx.stroke();
      }
      /*
      ctx.fillText(this.currentClip, this.left+10, this.top); // text, x, y
      ctx.fillText(this.currentFrame.toString(), this.left + 10, this.top+30); // text, x, y
      */
    }
  }


  incFrame() {
    if (this.currentFrame!=null && this.currentClip!=null) {
      const len = this.clips.get(this.currentClip)!.length;
      this.currentFrame = (this.currentFrame + 1) % len;
      this.top = this.vy + this.top;
      this.left = this.vx + this.left;
      if (this.target.length == 0) {
        if (this.top < this.boundry.top) {
          this.top = this.boundry.top;
        }
        if (this.top > this.boundry.bottom) {
          this.top = this.boundry.bottom;
        }
        if (this.left < this.boundry.left) {
          this.left = this.boundry.left;
        }
        if (this.left > this.boundry.right) {
          this.left = this.boundry.right;
        }
      }
    }
  }

  setAnimationClip(top: number, left: number, start: number) {
    const spiriteHeight = 200;
    const spiriteWeight = 200;
    const clips = [];
    for (let i=0; i< 24; i++) {
      clips.push(new ClipRect(0, spiriteWeight*i, spiriteWeight*(i+1), spiriteHeight));
    }
    this.clips.set("normal", clips);
    this.top = top;
    this.left = left;
    this.currentClip = "normal";
    this.currentFrame = start;
  }
}


export function createAnimationClip(index: number, spriteSheet: string, top:number, left:number, start: number) {
  const boundry = new ClipRect(HEIGHT/2 - 40, 50, WIDTH-100, HEIGHT-200);
  const spriteSheetImage = new Image();
  spriteSheetImage.setAttribute('crossOrigin', '');
  spriteSheetImage.src = spriteSheet;
  const clip = new Clip(index, spriteSheetImage, boundry, 0.5);
  clip.setAnimationClip(top, left, start)
  return clip;
}
