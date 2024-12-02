import SUNDOG from "../images/season1/sundog.jpg";
import FROG from "../images/season1/frog.jpg";
import HIPPO from "../images/season1/hippo.jpg";
import AMI from "../images/season1/ami.jpg";
import BURGER from "../images/season1/burger.png";
import ZKJ from "../images/season1/zkj.jpg";
import DALP from "../images/season1/dalp.jpg";
import DOKUAN from "../images/season1/dokuan.jpg";
import EDDY from "../images/season1/eddy.jpg";
import PSD from "../images/season1/psd.jpg";
import ZKSHARK from "../images/season1/zkshark.jpg";
import DC from "../images/season1/deadchu.jpg";

//import MemeDefault from "./images/loading.png";
//
import FWOG from "../images/season2/fwog.jpg";
import BURGER2 from "../images/season2/burger.jpg";
import DOKUAN2 from "../images/season2/dokuan.jpg";
import GOCHUJANG from "../images/season2/gochujang.jpg";
import SUNBEANS from "../images/season2/sunbeans.jpg";
import KAWAII from "../images/season2/kawaii.jpg";
import MOUTAI from "../images/season2/moutai.jpg";
import ASTRO from "../images/season2/astro.jpg";

interface MemeInterface {
  name: string,
  cover: string,
  animationIndex: number | null,
  index: number,
}

class MemeSeasonInfo {
  memeInfoMap: Map<string, MemeInterface>;
  memeInfoList: Array<MemeInterface>;
  constructor(memeInfoList: Array<MemeInterface>) {
    this.memeInfoList = memeInfoList;
    this.memeInfoMap = new Map();
    for (const memeInfo of memeInfoList) {
      this.memeInfoMap.set(memeInfo.name, memeInfo);
    }
  }

  getCover(index: number) {
    return this.memeInfoList[index].cover;
  }

  getMemeIndex(name: string): number {
    const info = this.memeInfoMap.get(name);
    return info!.index;
  }
}

export const MemeSeasonPrevious = new MemeSeasonInfo([
  {
    name: "hippo",
    cover: HIPPO,
    animationIndex: 0,
    index: 0,
  },
  {
    name: "sundog",
    cover: SUNDOG,
    animationIndex: 1,
    index: 1,
  },
  {
    name: "frog",
    cover: FROG,
    animationIndex: 2,
    index: 2,
  },

  {
    name: "ami",
    cover: AMI,
    animationIndex: null,
    index: 3,
  },

  {
    name: "burger",
    cover: BURGER,
    animationIndex: 4,
    index: 4,
  },

  {
    name: "zkj",
    cover: ZKJ,
    index: 5,
    animationIndex: null,
  },

  {
    name: "dalp",
    cover: DALP,
    animationIndex: null,
    index: 6,
  },

  {
    name: "dokuan",
    animationIndex: 3,
    cover: DOKUAN,
    index: 7,
  },

  {
    name: "eddy",
    cover: EDDY,
    animationIndex: null,
    index: 8,
  },

  {
    name: "psd",
    cover: PSD,
    animationIndex: null,
    index: 9,
  },

  {
    name: "zkshark",
    cover: ZKSHARK,
    animationIndex: null,
    index: 10,
  },

  {
    name: "deadchu",
    cover: DC,
    animationIndex: null,
    index: 11,
  },
]);

export const MemeSeasonCurrent = new MemeSeasonInfo([
  {
    name: "fwog",
    cover: FWOG,
    animationIndex: 2,
    index: 0,
  },
  {
    name: "burger",
    cover: BURGER2,
    animationIndex: 4,
    index: 1,
  },
  {
    name: "dokuan",
    cover: DOKUAN2,
    animationIndex: 3,
    index: 2,
  },
  {
    name: "gochujang",
    cover: GOCHUJANG,
    animationIndex: null,
    index: 3,
  },
  {
    name: "sunbeans",
    cover: SUNBEANS,
    animationIndex: null,
    index: 4,
  },
  {
    name: "kawaii",
    cover: KAWAII,
    animationIndex: null,
    index: 5,
  },
  {
    name: "moutai",
    cover: MOUTAI,
    animationIndex: null,
    index: 6,
  },
  {
    name: "astro",
    cover: ASTRO,
    animationIndex: null,
    index: 7,
  },

  {
    name: "eddy",
    cover: EDDY,
    animationIndex: null,
    index: 8,
  },

  {
    name: "psd",
    cover: PSD,
    animationIndex: null,
    index: 9,
  },

  {
    name: "zkshark",
    cover: ZKSHARK,
    animationIndex: null,
    index: 10,
  },

  {
    name: "deadchu",
    cover: DC,
    animationIndex: null,
    index: 11,
  },
]);
