import SUNDOG from "./images/memefront/sundog.jpg";
import FROG from "./images/memefront/frog.jpg";
import HIPPO from "./images/memefront/hippo.jpg";
import MemeDefault from "./images/loading.png";


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
  "default": {
    cover: MemeDefault,
  }
}

const coverList = [
  MemeInfo["hippo"],
  MemeInfo["sundog"],
  MemeInfo["frog"],
];

export function getCover(index: number) {
  return coverList[index].cover;
}

export const memeInfoList = [
  MemeInfo["frog"],
  MemeInfo["sundog"],
  MemeInfo["hippo"],
  {...MemeInfo["default"], index: 3},
  {...MemeInfo["default"], index: 4},
  {...MemeInfo["default"], index: 5},
  {...MemeInfo["default"], index: 6},
  {...MemeInfo["default"], index: 7},
  {...MemeInfo["default"], index: 8},
  {...MemeInfo["default"], index: 9},
  {...MemeInfo["default"], index: 10},
  {...MemeInfo["default"], index: 11},
  {...MemeInfo["default"], index: 12},
  {...MemeInfo["default"], index: 13},
  {...MemeInfo["default"], index: 14},
  {...MemeInfo["default"], index: 15},
  {...MemeInfo["default"], index: 16},
  {...MemeInfo["default"], index: 17},
  {...MemeInfo["default"], index: 18},
]



