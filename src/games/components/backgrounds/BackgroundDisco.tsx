import { Clip } from "../../animations/meme";
import {
  Torch,
  Audience,
  drawHorn,
  drawBackground,
  Light,
  FixedLight,
  WIDTH,
  Beat,
  drawScreen,
  FocusTorch,
  HEIGHT,
} from "../../draw";
import { MemeProp } from "../../season";
import { ShapeBuilder } from "../../ShapeBuilder";
import spirits from "../../spirite";
import { BackgroundBase, ShapeProps, ShapeState } from "./BackgroundBase";

export class BackgroundDisco extends BackgroundBase {
  fixedLights: Array<FixedLight>;
  audience: Audience;

  constructor(
    clips: Array<Clip>,
    shapeBuilder: ShapeBuilder,
    lights: Array<Light>,
    torch: Torch,
    focusTorch: FocusTorch
  ) {
    super(clips, shapeBuilder, lights, torch, focusTorch);
    this.effectHeight = 400;
    this.fixedLights = [new FixedLight(0, 0)];
    this.audience = new Audience();
  }

  draw(
    ratioArray: Array<Beat>,
    memes: MemeProp[],
    shapeProps: ShapeProps
  ): void {
    if (!this.context) {
      return;
    }
    this.context.clearRect(0, 0, WIDTH, HEIGHT);
    drawScreen(ratioArray, this.context);

    if (shapeProps.state == ShapeState.Text && shapeProps.text) {
      this.shapeBuilder.renderText(shapeProps.text, true);
    } else if (
      shapeProps.state == ShapeState.Image &&
      shapeProps.image &&
      shapeProps.imageRect
    ) {
      this.shapeBuilder.renderImage(shapeProps.image, shapeProps.imageRect);
    } else {
      this.shapeBuilder.render();
    }

    drawBackground(ratioArray, this.context);
    this.context.drawImage(spirits.leftEcoImage, 0, 0, 1700 * 0.5, 1076 * 0.5);
    this.context.drawImage(
      spirits.rightEcoImage,
      WIDTH - 1324 * 0.5,
      0,
      1324 * 0.5,
      798 * 0.5
    );

    drawHorn(ratioArray, this.context);
    for (const light of this.fixedLights) {
      light.drawLight(ratioArray, this.context);
    }
    this.torch.drawLight(ratioArray, this.context);
    const sortedClips = this.clips.sort(
      (a, b) => a.getBottom() - b.getBottom()
    );
    for (const obj of sortedClips) {
      obj.draw(this.context, memes);
    }
    for (const light of this.lights) {
      light.drawLight(ratioArray, this.context);
    }
    this.audience.drawBeat(ratioArray, this.context);
  }
}
