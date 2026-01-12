type Interval = "i1" | "i3" | "i5" | "d";

export function Thumbnail_Image_Size(interval: Interval) {
  switch (interval) {
    case "i1": {
      return {
        width: 1180,
        height: 340,
      };
    }
    case "i3": {
      return {
        width: 820,
        height: 340,
      };
    }
    case "i5": {
      return {
        width: 856,
        height: 340,
      };
    }
    case "d": {
      return {
        width: 898,
        height: 340,
      };
    }
  }
}
//https://charts-node.finviz.com/chart.ashx?cs=l&t=NVDA&tf=d&pm=240&am=0&ct=candle_stick&tm=d
export function Thumbnail_Image_Url() {}
