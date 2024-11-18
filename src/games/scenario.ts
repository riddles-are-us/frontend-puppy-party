import {Clip, createAnimationClip, createDefaultAnimationClip} from "./animations/meme";
import {
  Torch, Audience, drawHorn,
  drawBackground, drawProgress,
  Light, FixedLight,
  HEIGHT, WIDTH, Beat, drawScreen,
}  from "./draw";
import {ShapeBuilder, Shape, Effect} from "./effects";

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
    for (let i = 0; i<20; i++) {
      if (i % 2 == 0) {
        this.clips.push(
          createDefaultAnimationClip(getRandomNumber(4), 220 + getRandomNumber(80), 50 + getRandomNumber(800), (i * 2)% 24),
        );
      } else {
        this.clips.push(
          createAnimationClip(0, getRandomNumber(3), 220 + getRandomNumber(80), 50 + getRandomNumber(800), (i * 2)% 24),
        );
      }
    }
    this.clips[0].name = "ME";
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
    this.actorState = "restore";
    this.shapeBuilder = new ShapeBuilder();
    this.toggleText = ["MEME", "DISCO", "LFGGGG", "ROCK"];
    this.shape = this.shapeBuilder.letter("!!!!!!!!!");
    this.toggleShapeCounter = 100;
    this.toggleShapeIndex = this.toggleText.length;
  }

  setSelectedMeme(index: number) {
    this.actor.setAnimationClip(0, index, 220 + getRandomNumber(80), 50 + getRandomNumber(800), 0);
  }

  focusActor(left: number, top: number) {
    this.actorState = "focus";
    this.actor.target = [left, top];
  }

  restoreActor() {
    this.actorState = "restore";
    const top = 220 + getRandomNumber(80);
    const left = 50 + getRandomNumber(800);
    this.actor.target = [left, top];
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
        obj.draw(context);
    }
    for (const light of this.lights) {
      light.drawLight(ratioArray, context);
    }
    this.audience.drawBeat(ratioArray, context);
    drawProgress(state.progressRatio, context);
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
      const rx = 2 * Math.random() - 1;
      const ry = Math.sign(rx) * Math.sqrt(1 - rx*rx);
      obj.setSpeed(rx*vratio, ry*vratio);
    }

    if (this.actor.target != null) {
      let rx = this.actor.target[0] - this.actor.left;
      let ry = this.actor.target[1] - this.actor.top;
      if (Math.abs(rx) > 10) {
        rx = Math.sign(rx) * 10;
      }
      if (Math.abs(ry) > 10) {
        ry = Math.sign(ry) * 10;
      }
      this.actor.setSpeed(rx, ry);
    }

    for (const l of this.lights) {
      l.incFrame();
    }
    this.torch.incFrame();
    this.toggleShapeCounter --;
  }
}



export const scenario = new Scenario();
