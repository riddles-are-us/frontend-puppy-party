import {Clip, createAnimationClip, createDefaultAnimationClip} from "./animations/meme";
import {
  Torch, Audience, drawHorn,
  drawBackground,
  Light, FixedLight,
  HEIGHT, WIDTH, Beat, drawScreen, FocusTorch,
}  from "./draw";
import { ShapeBuilder, Shape, Effect} from "./effects";
import { MemeSeasonCurrent } from "./config";
import spirits from "./spirite";

function getRandomNumber(range: number): number {
    return Math.floor(Math.random() * range);
}

class Scenario {
  status: string;
  clips: Array<Clip>;
  lights: Array<Light>;
  fixedLights: Array<FixedLight>;
  torch: Torch;
  focusTorch: FocusTorch;
  audience: Audience;
  actor: Clip;
  actorState: "focus" | "restore";
  shapeBuilder: ShapeBuilder;
  shape: Shape;
  toggleShapeCounter: number;
  toggleShapeIndex: number;
  toggleText: Array<string>;

  constructor() {
    this.audience = new Audience();
    this.status = "pause";
    this.clips = [];
    for (let i = 0; i< MemeSeasonCurrent.memeInfoList.length; i++) {
      const info:any = MemeSeasonCurrent.memeInfoList[i];
      if (info.animationIndex != null) {
        const clip = createAnimationClip(0, info.animationIndex, 220 + getRandomNumber(80), 50 + getRandomNumber(800), (i * 2)% 24);
        this.clips.push(clip);
        clip.name = info.name;
      } else {
        const clip = createDefaultAnimationClip(getRandomNumber(4), 220 + getRandomNumber(80), 50 + getRandomNumber(800), (i * 2)% 24);
        clip.name = info.name;
        this.clips.push(clip);
      }
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
    this.fixedLights = [new FixedLight(0,0)];
    this.torch = new Torch(100, 100, 40, 4, 4);
    this.focusTorch = new FocusTorch();
    this.actorState = "restore";
    this.shapeBuilder = new ShapeBuilder();
    this.toggleText = ["MEME", "DISCO", "LFGGGG", "ROCK"];
    this.shape = this.shapeBuilder.letter("!!!!!!!!!");
    this.toggleShapeCounter = 100;
    this.toggleShapeIndex = this.toggleText.length;
  }

  selectMeme(cursorLeft: number, cursorTop: number) {
    const clips = this.clips.sort((a, b) => b.getBottom() - a.getBottom()); // front first
    for (const clip of clips) {
      if (clip.inRect(cursorLeft, cursorTop)) {
        this.actor.focus = false;
        clip.focus = true;
        this.actor = clip;
        const index = MemeSeasonCurrent.getMemeIndex(clip.name);
        this.focusTorch.resetFrame();
        return index;
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


  setSelectedMeme(index: number) {
    return;
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
    if (move == 1) {
      this.waveClips();
    } else if (move == 2) {
      this.cicleClips();
    } else if (move == 3) {
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


  draw(ratioArray: Array<Beat>, state: any) {
    const c = document.getElementById("canvas")! as HTMLCanvasElement;
    //c.width = window.innerWidth;
    //c.height = window.innerHeight;
    c.width = WIDTH;
    c.height = HEIGHT;
    const context = c.getContext("2d")!;
    context.clearRect(0, 0, c.width, c.height);
    drawScreen(ratioArray, context);

    const eff = new Effect(WIDTH, 400, context);
    if (this.toggleShapeCounter == 0) {
      this.toggleShapeIndex = (this.toggleShapeIndex + 1) % this.toggleText.length;
      const text = this.toggleText[this.toggleShapeIndex];
      this.shape.switchShape(eff, this.shapeBuilder.letter(text), true);
      this.toggleShapeCounter = 100;
    } else {
      this.shape.render(eff);
    }

    drawBackground(ratioArray, context);
    context.drawImage(spirits.leftEcoImage, 0, 0, 1700 * 0.5, 1076*0.5);
    context.drawImage(spirits.rightEcoImage, WIDTH - 1324 * 0.5, 0, 1324*0.5, 798*0.5);

    const [bLeft, bTop] = this.actor.getZCenter()!;
    this.focusTorch.drawLight(bLeft, bTop, context);


    /*
    context.globalCompositeOperation = 'hue';
    context.fillStyle = `hsl(120, 100%, 20%)`;
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.globalCompositeOperation = 'source-over';
     */

    drawHorn(ratioArray, context, state.giftboxShake);
    for (const light of this.fixedLights) {
      light.drawLight(ratioArray, context);
    }
    this.torch.drawLight(ratioArray, context);
    const clips = this.clips.sort((a, b) => a.getBottom() - b.getBottom());
    for (const obj of clips) {
      obj.draw(context, state.memeList);
    }
    for (const light of this.lights) {
      light.drawLight(ratioArray, context);
    }
    this.audience.drawBeat(ratioArray, context);
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
}



export const scenario = new Scenario();
