import BackGround from "./images/background.png";
import Screen from "./images/screen.png";
import DiscoDog from "./images/discodog.png";
import Horn from "./images/horn.png";
import AudNoLight from "./images/audnolight.png";
import AudLight from "./images/audlight.png";
import Progress from "./images/progress.png";
import GiftBox from "./images/giftbox.png";
import LeftEco from "./images/lefteco.png";
import RightEco from "./images/righteco.png";

import MEME0 from "./images/loading.png";
import MEME1 from "./images/loading.png";
import MEME2 from "./images/loading.png";
import MEME3 from "./images/loading.png";
import MEME4 from "./images/loading.png";
import MEME5 from "./images/loading.png";
import MEME6 from "./images/loading.png";
import MEME7 from "./images/loading.png";
import MEME8 from "./images/loading.png";
import MEME9 from "./images/loading.png";
import MEME10 from "./images/loading.png";
import MEME11 from "./images/loading.png";

const memeImageList = [
  MEME0,
  MEME1,
  MEME2,
  MEME3,
  MEME4,
  MEME5,
  MEME6,
  MEME7,
  MEME8,
  MEME9,
  MEME10,
  MEME11,
];

const backgroundImage = new Image();
backgroundImage.src = BackGround;

const screenImage = new Image();
screenImage.src = Screen;

const leftEcoImage = new Image();
leftEcoImage.src = LeftEco;

const rightEcoImage = new Image();
rightEcoImage.src = RightEco;

const discodogImage = new Image();
discodogImage.src = DiscoDog;

const hornImage = new Image();
hornImage.src = Horn;

const audNoLight = new Image();
audNoLight.src = AudNoLight;

const audLight = new Image();
audLight.src = AudLight;

const progress = new Image();
progress.src = Progress;

const giftbox = new Image();
giftbox.src = GiftBox;

export default {
  screenImage: screenImage,
  leftEcoImage: leftEcoImage,
  rightEcoImage: rightEcoImage,
  backgroundImage: backgroundImage,
  spirites: [discodogImage],
  audience: [audNoLight, audLight],
  horn: hornImage,
  progressBar: progress,
  giftbox: giftbox,
  memeImageList: memeImageList,
}
