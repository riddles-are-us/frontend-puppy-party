import { MemeListElement } from "../../../data/puppy_party/properties";
import { Clip } from "../../animations/meme";
import { Beat, FocusTorch, Light, Torch } from "../../draw";
import { Shape, ShapeBuilder } from "../../effects";

export class BackgroundBase {
  clips: Array<Clip>;
  shapeBuilder: ShapeBuilder;
  shape: Shape;
  toggleShapeCounter: number;
  toggleShapeIndex: number;
  toggleText: Array<string>;
  lights: Array<Light>;
  torch: Torch;
  focusTorch: FocusTorch;
  actor: Clip;

  constructor(
    clips: Array<Clip>,
    shapeBuilder: ShapeBuilder,
    shape: Shape,
    toggleShapeCounter: number,
    toggleShapeIndex: number,
    toggleText: Array<string>,
    lights: Array<Light>,
    torch: Torch,
    focusTorch: FocusTorch,
    actor: Clip
  ) {
    this.clips = clips;
    this.shapeBuilder = shapeBuilder;
    this.shape = shape;
    this.toggleShapeCounter = toggleShapeCounter;
    this.toggleShapeIndex = toggleShapeIndex;
    this.toggleText = toggleText;
    this.lights = lights;
    this.torch = torch;
    this.focusTorch = focusTorch;
    this.actor = actor;
  }

  draw(
    ratioArray: Array<Beat>,
    context: CanvasRenderingContext2D,
    memeList: MemeListElement[]
  ): void {
    /* */
  }
}
