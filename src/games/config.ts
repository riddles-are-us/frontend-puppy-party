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
import KAWAII from "../images/season2/kawaii.jpg";
import GAIB from "../images/season2/gaib.jpg";
import NEIRO from "../images/season2/neiro.jpg";
import SUNBEANS from "../images/season2/sunbeans.jpg";
import CHEEMS from "../images/season2/cheems.jpg";
import SHAUNMOON from "../images/season2/shaunmoon.jpg";
import AIKUN from "../images/season2/ikun.jpg";
import FIAMMA from "../images/season2/fiamma.jpg";
import PAOPAO from "../images/season2/paopao.jpg";

import cheems_logo from "./images/cheems.png";


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
    name: "burger",
    cover: BURGER2,
    animationIndex: 0,
    index: 0,
  },
  {
    name: "dokuan",
    cover: DOKUAN2,
    animationIndex: 1,
    index: 1,
  },
  {
    name: "fwog",
    cover: FWOG,
    animationIndex: 2,
    index: 2,
  },
  {
    name: "kawaii",
    cover: KAWAII,
    animationIndex: 3,
    index: 3,
  },
  {
    name: "gaib",
    cover: GAIB,
    animationIndex: 4,
    index: 4,
  },
  {
    name: "neiro",
    cover: NEIRO,
    animationIndex: 5,
    index: 5,
  },
  {
    name: "sunbeans",
    cover: SUNBEANS,
    animationIndex: 6,
    index: 6,
  },
  {
    name: "cheems",
    cover: CHEEMS,
    animationIndex: 7,
    index: 7,
  },

  {
    name: "shaunmoon",
    cover: SHAUNMOON,
    animationIndex: 8,
    index: 8,
  },

  {
    name: "aikun",
    cover: AIKUN,
    animationIndex: 9,
    index: 9,
  },

  {
    name: "fiamma",
    cover: FIAMMA,
    animationIndex: 10,
    index: 10,
  },

  {
    name: "paopao",
    cover: PAOPAO,
    animationIndex: 11,
    index: 11,
  },
]);

export const SponsorLogo = cheems_logo;