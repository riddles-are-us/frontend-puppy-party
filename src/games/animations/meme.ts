import {
  HEIGHT, WIDTH,
}  from "../draw";

import spirites from "../spirite";

const MEME_DEFAULT_CATEGORY = spirites.spirites.length - 1; // the last animation are of default dogs


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
  target: [number, number] | null;
  constructor(src: HTMLImageElement, boundry: ClipRect, ratio: number) {
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
    this.target = null;
  }

  inRect(cursorLeft: number, cursorTop: number): boolean {
    const rect = this.clips.get(this.currentClip!)![this.currentFrame!];
    const w = rect.right-rect.left;
    const bottom = this.top + w * this.ratio;
    const right = this.left + w * this.ratio;
    const margin = w * this.ratio / 4;
    console.log(this.left + margin, this.top + margin, right-margin, bottom-margin);
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


  setSpeed(vx: number, vy: number) {
    this.vx = vx;
    this.vy = vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
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
      {
        ctx.fillRect(this.left+30, this.top - 13, this.name.length * 6 + 10, 15);
        ctx.fillStyle = "white";  // Red color
        ctx.font = "12px Arial";
        ctx.fillText(this.name, this.left+35, this.top); // text, x, y
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
      if (this.target == null) {
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

  setAnimationClip(categoryIndex: number, animeIndex: number, top: number, left: number, start: number) {
    const spiriteHeight = 200;
    const spiriteWeight = 200;
    this.src = spirites.spirites[categoryIndex];
    const clips = [];
    for (let i=0; i< 24; i++) {
      const clipTop = animeIndex*spiriteHeight;
      clips.push(new ClipRect(clipTop, spiriteWeight*i, spiriteWeight*(i+1), clipTop + spiriteHeight));
    }
    this.clips.set("normal", clips);
    this.top = top;
    this.left = left;
    this.currentClip = "normal";
    this.currentFrame = start;
  }
}


export function createAnimationClip(categoryIndex: number, animeIndex: number, top:number, left:number, start: number) {
  const boundry = new ClipRect(HEIGHT/2 - 40, 50, WIDTH-100, HEIGHT-200);
  const clip = new Clip(spirites.spirites[categoryIndex], boundry, 0.5);
  clip.setAnimationClip(categoryIndex, animeIndex, top, left, start)
  return clip;
}

export function createDefaultAnimationClip(animeIndex: number, top: number, left: number, start: number) {
  return createAnimationClip(MEME_DEFAULT_CATEGORY, animeIndex, top, left, start);
}
