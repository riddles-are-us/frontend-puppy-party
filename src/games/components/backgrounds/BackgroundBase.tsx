import { MemeListElement } from "../../../data/puppy_party/properties";
import { Clip, ClipRect } from "../../animations/meme";
import { Beat, FocusTorch, HEIGHT, Light, Torch, WIDTH } from "../../draw";
import { ShapeBuilder } from "../../ShapeBuilder";

export class BackgroundBase {
  clips: Array<Clip>;
  shapeBuilder: ShapeBuilder;
  lights: Array<Light>;
  torch: Torch;
  focusTorch: FocusTorch;
  actor: Clip;
  effectWidth: number;
  effectHeight: number;
  context?: CanvasRenderingContext2D;

  constructor(
    clips: Array<Clip>,
    shapeBuilder: ShapeBuilder,
    lights: Array<Light>,
    torch: Torch,
    focusTorch: FocusTorch,
    actor: Clip
  ) {
    this.clips = clips;
    this.shapeBuilder = shapeBuilder;
    this.lights = lights;
    this.torch = torch;
    this.focusTorch = focusTorch;
    this.actor = actor;
    this.effectWidth = WIDTH;
    this.effectHeight = HEIGHT;
  }

  init(context: CanvasRenderingContext2D) {
    this.context = context;
    this.shapeBuilder.init(this.effectWidth, this.effectHeight, this.context);
  }

  draw(
    ratioArray: Array<Beat>,
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
