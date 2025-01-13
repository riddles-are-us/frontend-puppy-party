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
} from "../../draw";
import { ShapeBuilder, Shape, Effect } from "../../effects";
import spirits from "../../spirite";
import { BackgroundBase } from "./BackgroundBase";
import { MemeListElement } from "../../../data/puppy_party/properties";

export class BackgroundDisco extends BackgroundBase {
  fixedLights: Array<FixedLight>;
  audience: Audience;

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
    super(
      clips,
      shapeBuilder,
      shape,
      toggleShapeCounter,
      toggleShapeIndex,
      toggleText,
      lights,
      torch,
      focusTorch,
      actor
    );

    this.fixedLights = [new FixedLight(0, 0)];
    this.audience = new Audience();
  }

  draw(
    ratioArray: Array<Beat>,
    context: CanvasRenderingContext2D,
    memeList: MemeListElement[]
  ): void {
    drawScreen(ratioArray, context);
    const eff = new Effect(WIDTH, 400, context);
    const dancingObj = this.clips.find((obj) => obj.target.length > 0);

    if (dancingObj && dancingObj.currentClip && dancingObj.currentFrame) {
      const rect = dancingObj.clips.get(dancingObj.currentClip)![
        dancingObj.currentFrame
      ];
      this.shape.render_image(
        eff,
        this.shapeBuilder.processImageFile(dancingObj.src, rect)
      );
      this.toggleShapeCounter = 1;
      this.shape.render(eff);
    } else if (this.toggleShapeCounter == 0) {
      this.toggleShapeIndex =
        (this.toggleShapeIndex + 1) % this.toggleText.length;
      const text = this.toggleText[this.toggleShapeIndex];
      this.shape.switchShape(eff, this.shapeBuilder.letter(text), true);
      this.toggleShapeCounter = 100;
    } else {
      this.shape.render(eff);
    }

    drawBackground(ratioArray, context);
    context.drawImage(spirits.leftEcoImage, 0, 0, 1700 * 0.5, 1076 * 0.5);
    context.drawImage(
      spirits.rightEcoImage,
      WIDTH - 1324 * 0.5,
      0,
      1324 * 0.5,
      798 * 0.5
    );

    const [bLeft, bTop] = this.actor.getZCenter()!;
    this.focusTorch.drawLight(bLeft, bTop, context);

    drawHorn(ratioArray, context);
    for (const light of this.fixedLights) {
      light.drawLight(ratioArray, context);
    }
    this.torch.drawLight(ratioArray, context);
    const sortedClips = this.clips.sort(
      (a, b) => a.getBottom() - b.getBottom()
    );
    for (const obj of sortedClips) {
      obj.draw(context, memeList);
    }
    for (const light of this.lights) {
      light.drawLight(ratioArray, context);
    }
    this.audience.drawBeat(ratioArray, context);
  }
}
