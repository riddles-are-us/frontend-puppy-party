import { MemeListElement } from "../../../data/puppy_party/properties";
import { Clip, ClipRect } from "../../animations/meme";
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
    memeList: MemeListElement[],
    shapeProps: ShapeProps
  ): void {
    /* */
  }
}

export enum ShapeState {
  None,
  Text,
  Image,
}

export class ShapeProps {
  state: ShapeState;
  text: string | null;
  image: HTMLImageElement | null;
  imageRect: ClipRect | null;

  private constructor(
    state: ShapeState,
    text?: string | null,
    image?: HTMLImageElement | null,
    imageRect?: ClipRect | null
  ) {
    this.state = state;
    this.text = text ?? null;
    this.image = image ?? null;
    this.imageRect = imageRect ?? null;
  }

  static GetEmptyShape(): ShapeProps {
    return new ShapeProps(ShapeState.None);
  }

  static GetTextShape(text: string): ShapeProps {
    return new ShapeProps(ShapeState.Text, text);
  }

  static GetImageShape(
    image: HTMLImageElement,
    imageRect: ClipRect
  ): ShapeProps {
    return new ShapeProps(ShapeState.Image, null, image, imageRect);
  }
}
