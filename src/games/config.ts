import SUNDOG from "./images/memefront/sundog.jpg";
import FROG from "./images/memefront/frog.jpg";
import HIPPO from "./images/memefront/hippo.jpg";
import MemeDefault from "./images/loading.png";

import AMI from "./images/meme-icons/ami.jpg";
import BLAZEFIN from "./images/meme-icons/blazefin.jpg";
import BUFF from "./images/meme-icons/buff.jpg";
import BULL from "./images/meme-icons/bull.png";
import BURGER from "./images/meme-icons/burger.png";
import CAPTAINFIN from "./images/meme-icons/captainfin.jpg";
import CAT from "./images/meme-icons/cat.jpg";
import DALP from "./images/meme-icons/dalp.jpg";
import DOKUAN from "./images/meme-icons/dokuan.jpg";
import DONA from "./images/meme-icons/dona.jpg";
import EDDY from "./images/meme-icons/eddy.jpg";
import FLIX from "./images/meme-icons/flix.jpg";
import HMC from "./images/meme-icons/hmc.jpg";
import PSD from "./images/meme-icons/psd.jpg";
import PUFF from "./images/meme-icons/puff.jpg";
import YOME from "./images/meme-icons/yome.jpg";
import ZKJ from "./images/meme-icons/zkj.jpg";
import ZKSHARK from "./images/meme-icons/zkshark.jpg";

export const MemeInfo = {
  "hippo": {
    cover: HIPPO,
    animationIndex: 0,
    index: 0,
  },
  "sundog": {
    cover: SUNDOG,
    animationIndex: 1,
    index: 1,
  },
  "frog": {
    cover: FROG,
    animationIndex: 2,
    index: 2,
  },
  "ami": {
    name: "ami",
    cover: AMI,
    index: 3,
  },
  
  "blazefin": {
    name: "blazefin",
    cover: BLAZEFIN,
    index: 4,
  },
  
  "buff": {
    name: "buff",
    cover: BUFF,
    index: 5,
  },

  "bull": {
    name: "bull",
    cover: BULL,
    index: 6,
  },

  "burger": {
    name: "burger",
    cover: BURGER,
    index: 7,
  },

  "captainfin": {
    name: "captainfin",
    cover: CAPTAINFIN,
    index: 8,
  },

  "cat": {
    name: "cat",
    cover: CAT,
    index: 9,
  },

  "dalp": {
    name: "dalp",
    cover: DALP,
    index: 10,
  },

  "dokuan": {
    name: "dokuan",
    cover: DOKUAN,
    index: 11,
  },

  "dona": {
    name: "dona",
    cover: DONA,
    index: 12,
  },

  "eddy": {
    name: "eddy",
    cover: EDDY,
    index: 13,
  },

  "flix": {
    name: "flix",
    cover: FLIX,
    index: 14,
  },

  "hmc": {
    name: "hmc",
    cover: HMC,
    index: 15,
  },

  "psd": {
    name: "psd",
    cover: PSD,
    animationIndex: 16,
    index: 16,
  },

  "puff": {
    name: "psd",
    cover: PUFF,
    index: 17,
  },

  "yome": {
    name: "yome",
    cover: YOME,
    index: 18,
  },

  "zkj": {
    name: "zkj",
    cover: ZKJ,
    index: 19,
  },

  "zkshark": {
    name: "zkshark",
    cover: ZKSHARK,
    index: 20,
  },

  "default": {
    cover: MemeDefault,
  }
}

const coverList = [
  MemeInfo["hippo"],
  MemeInfo["sundog"],
  MemeInfo["frog"],
  MemeInfo["ami"],
  MemeInfo["blazefin"],
  MemeInfo["buff"],
  MemeInfo["bull"],
  MemeInfo["burger"],
  MemeInfo["captainfin"],
  MemeInfo["cat"],
  MemeInfo["dalp"],
  MemeInfo["dokuan"],
  MemeInfo["dona"],
  MemeInfo["eddy"],
  MemeInfo["flix"],
  MemeInfo["hmc"],
  MemeInfo["psd"],
  MemeInfo["puff"],
  MemeInfo["yome"],
  MemeInfo["zkj"],
  MemeInfo["zkshark"],
];

export function getCover(index: number) {
  return coverList[index].cover;
}

export const memeInfoList = [
  MemeInfo["frog"],
  MemeInfo["sundog"],
  MemeInfo["hippo"],

  MemeInfo["ami"],
  MemeInfo["blazefin"],
  MemeInfo["buff"],
  MemeInfo["bull"],
  MemeInfo["burger"],
  MemeInfo["captainfin"],
  MemeInfo["cat"],
  MemeInfo["dalp"],
  MemeInfo["dokuan"],
  MemeInfo["dona"],
  MemeInfo["eddy"],
  MemeInfo["flix"],
  MemeInfo["hmc"],
  MemeInfo["psd"],
  MemeInfo["puff"],
  MemeInfo["yome"],
  MemeInfo["zkj"],
  MemeInfo["zkshark"],
]



