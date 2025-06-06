import { Clip, createAnimationClip } from "./animations/meme";
import {
  Torch, Light, HEIGHT, WIDTH, Beat, FocusTorch,
  processShakeEffect
} from "./draw";
import { ShapeBuilder } from "./ShapeBuilder";
import { BackgroundDisco } from "./components/backgrounds/BackgroundDisco";
import { BackgroundBase, ShapeProps } from "./components/backgrounds/BackgroundBase";
import { MemeProp } from "./season";

function getRandomNumber(range: number): number {
    return Math.floor(Math.random() * range);
}

export class Scenario {
  status: string;
  clips: Array<Clip>;
  lights: Array<Light>;
  torch: Torch;
  focusTorch: FocusTorch;
  actor: Clip;
  actorState: "focus" | "restore";
  toggleShapeCounter: number;
  toggleShapeIndex: number;
  toggleText: Array<string>;
  background: BackgroundBase;
  context?: CanvasRenderingContext2D;

  constructor(currentMemes: MemeProp[]) {
    this.status = "play";
    this.clips = [];
    for (let i = 0; i< currentMemes.length; i++) {
      const clip = createAnimationClip(i, currentMemes[i].data.spriteSheet, 220 + getRandomNumber(80), 50 + getRandomNumber(800), (i * 2)% 24);
      this.clips.push(clip);
      clip.name = currentMemes[i].data.name;
    }
    this.clips[0].focus = true;
    this.lights = [
      new Light(0,115,90, 200, 70, 6, 2),
      new Light(0,300,60, 140, 60, 3, 4),
      new Light(0,300,60, 140, 110, -9, 6),
      new Light(0,500,60, 140, 130, 4, 7),
      new Light(0,500,60, 140, 80, -10, 8),
      new Light(0,800,30, 90, 60, 2, 10),
    ];
    this.actor = this.clips[0];
    this.torch = new Torch(100, 100, 40, 4, 4);
    this.focusTorch = new FocusTorch();
    this.actorState = "restore";
    this.toggleText = ["MEME", "DISCO", "LFGGGG", "ROCK"];
    this.toggleShapeCounter = 100;
    this.toggleShapeIndex = 0;

    const shapeBuilder = new ShapeBuilder(this.toggleText[0]);
    this.background = new BackgroundDisco(
      this.clips,
      shapeBuilder,
      this.lights,
      this.torch,
      this.focusTorch);
  }

  selectMeme(cursorLeft: number, cursorTop: number) {
    const clips = this.clips.sort((a, b) => b.getBottom() - a.getBottom()); // front first
    for (const clip of clips) {
      if (clip.inRect(cursorLeft, cursorTop)) {
        this.actor.focus = false;
        clip.focus = true;
        this.actor = clip;
        this.focusTorch.resetFrame();
        return clip.index;
      }
    }
    return null
  }

  hoverMeme(cursorLeft: number, cursorTop: number) {
    const clips = this.clips.sort((a, b) => b.getBottom() - a.getBottom()); // front first
    let picked = false;
    for (const clip of clips) {
      if (picked) {
        clip.hover = false;
        picked = true;
      } else if (clip.inRect(cursorLeft, cursorTop)) {
        clip.hover = true;
      } else {
        clip.hover = false;
      }
    }
  }

  cicleClips() {
    let j = 0;
    const factor = Math.PI * 2 / (this.clips.length - 1)
    for (let i=0; i<this.clips.length; i++) {
      if (this.clips[i] != this.actor) {
        const x = 300*Math.sin(j * factor);
        const y = 50*Math.cos(j * factor);
        this.clips[i].target = [[450 + x, 300 + y]];
        j++;
      }
    }
  }

  waveClips() {
    for (let i=0; i<this.clips.length; i++) {
      if (this.clips[i] != this.actor) {
        this.clips[i].target = [[150 + (60 * i), 300 + 30*Math.cos(((i + 1)*Math.PI)/3)]];
      }
    }
  }

  lineClips() {
    const mid = this.clips.length/2;
    for (let i=0; i<mid; i++) {
      if (this.clips[i] != this.actor) {
        this.clips[i].target = [[370 - (40 * i), 300 + 20*(i - 3)]];
      }
    }
    for (let i=mid; i<this.clips.length; i++) {
      if (this.clips[i] != this.actor) {
        this.clips[i].target = [[370 + (40 * i), 300 + 20*(i - 3 - mid)]];
      }
    }
  }

  focusActor(left: number, top: number, move: number) {
    if (move == 2) {
      this.waveClips();
    } else if (move == 3) {
      this.cicleClips();
    } else if (move == 4) {
      this.lineClips();
    }
    this.actorState = "focus";
    this.actor.target = [[left, top]];
  }

  clearTargets() {
    for (let i=0; i<this.clips.length; i++) {
      this.clips[i].target = [];
    }
  }

  restoreActor() {
    this.actorState = "restore";
    for (let i=0; i<this.clips.length; i++) {
      const top = 240 + getRandomNumber(80);
      const left = 50 + getRandomNumber(800);
      this.clips[i].target = [[left, top]];
    }
    setTimeout(() => {
          this.clearTargets();
    }, 3000);
  }

  init(){
    const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const context = canvas.getContext("2d")!;
    this.context = context;
    this.background.init(context);
  }

  draw(ratioArray: Array<Beat>, state: any) {
    if (this.context){
      const shapeProps = this.getShapeProps();
      this.background.draw(ratioArray, state.currentMemes, shapeProps);
  
      const [bLeft, bTop] = this.actor.getZCenter()!;
      this.focusTorch.drawLight(bLeft, bTop, this.context);
  
      processShakeEffect(ratioArray, state.giftboxShake);
    }
  }

  step(ratioArray: Array<Beat>) {
    for (let i=0; i<this.clips.length; i++) {
      const obj = this.clips[i];
      obj.incFrame();
      const channelIdx = i % ratioArray.length;
      let vratio = 1;
      const amplifier = 40;
      if (ratioArray[channelIdx].ratio > 1) {
        vratio = 1 + (ratioArray[channelIdx].ratio-1) * amplifier;
      }
      obj.setSpeed(vratio);
    }

    for (const l of this.lights) {
      l.incFrame();
    }
    this.torch.incFrame();
    this.toggleShapeCounter --;
  }

  private getShapeProps(): ShapeProps{
    const dancingObj = this.clips.find((obj) => obj.target.length > 0);
    if (dancingObj && dancingObj.currentClip && dancingObj.currentFrame) {
      const rect = dancingObj.clips.get(dancingObj.currentClip)![
        dancingObj.currentFrame
      ];
      this.toggleShapeCounter = 1;
      return ShapeProps.GetImageShape(dancingObj.src, rect);
    } else if (this.toggleShapeCounter == 0) {
      this.toggleShapeIndex =
        (this.toggleShapeIndex + 1) % this.toggleText.length;
      const text = this.toggleText[this.toggleShapeIndex];
      this.toggleShapeCounter = 100;
      return ShapeProps.GetTextShape(text);
    } else {
      return ShapeProps.GetEmptyShape();
    }
  }
}