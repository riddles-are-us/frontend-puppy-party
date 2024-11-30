import SUNDOG from "./images/memefront/sundog.jpg";
import FROG from "./images/memefront/frog.jpg";
import HIPPO from "./images/memefront/hippo.jpg";
import MemeDefault from "./images/loading.png";

import AMI from "./images/meme-icons/ami.jpg";
import BLAZEFIN from "./images/meme-icons/blazefin.jpg";
import BUFF from "./images/meme-icons/buff.jpg";
import BULL from "./images/meme-icons/bull.png";
import BURGER from "./images/meme-icons/burger.png";
import ZKJ from "./images/meme-icons/zkj.jpg";
import DALP from "./images/meme-icons/dalp.jpg";
import DOKUAN from "./images/meme-icons/dokuan.jpg";
import YOME from "./images/meme-icons/yome.jpg";
import EDDY from "./images/meme-icons/eddy.jpg";
import FLIX from "./images/meme-icons/flix.jpg";
import HMC from "./images/meme-icons/hmc.jpg";
import PSD from "./images/meme-icons/psd.jpg";
import ZKSHARK from "./images/meme-icons/zkshark.jpg";
import DC from "./images/meme-icons/deadchu.jpg";

export const MemeInfo = {
  "hippo": {
    name: "hippo",
    cover: HIPPO,
    animationIndex: 0,
    index: 0,
  },
  "sundog": {
    name: "sundog",
    cover: SUNDOG,
    animationIndex: 1,
    index: 1,
  },
  "frog": {
    name: "frog",
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

  "deadchu": {
    name: "deadchu",
    cover: DC,
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
    animationIndex: 4,
    index: 7,
  },

  "zkj": {
    name: "zkj",
    cover: ZKJ,
    index: 8,
  },

  "dalp": {
    name: "dalp",
    cover: DALP,
    index: 9,
  },

  "dokuan": {
    name: "dokuan",
    animationIndex: 3,
    cover: DOKUAN,
    index: 10,
  },

  "yome": {
    name: "yome",
    cover: YOME,
    index: 11,
  },

  "eddy": {
    name: "eddy",
    cover: EDDY,
    index: 12,
  },

  "flix": {
    name: "flix",
    cover: FLIX,
    index: 13,
  },

  "hmc": {
    name: "hmc",
    cover: HMC,
    index: 14,
  },

  "psd": {
    name: "psd",
    cover: PSD,
    index: 15,
  },

  "zkshark": {
    name: "zkshark",
    cover: ZKSHARK,
    index: 16,
  },

  "buff": {
    name: "buff",
    cover: BUFF,
    index: 17,
  },
}

const coverList = [
  MemeInfo["hippo"],
  MemeInfo["sundog"],
  MemeInfo["frog"],
  MemeInfo["ami"],
  MemeInfo["blazefin"],
  MemeInfo["deadchu"],
  MemeInfo["bull"],
  MemeInfo["burger"],
  MemeInfo["zkj"],
  MemeInfo["dalp"],
  MemeInfo["dokuan"],
  MemeInfo["yome"],
  MemeInfo["eddy"],
  MemeInfo["flix"],
  MemeInfo["hmc"],
  MemeInfo["psd"],
  MemeInfo["zkshark"],
  MemeInfo["buff"],
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
  MemeInfo["deadchu"],
  MemeInfo["bull"],
  MemeInfo["burger"],
  MemeInfo["zkj"],
  MemeInfo["dalp"],
  MemeInfo["dokuan"],
  MemeInfo["yome"],
  MemeInfo["eddy"],
  MemeInfo["flix"],
  MemeInfo["hmc"],
  MemeInfo["psd"],
  MemeInfo["zkshark"],
  MemeInfo["buff"],
]

export function getMemeIndex(name: string): number {
  const info = (MemeInfo as any)[name];
  return info.index;
}
