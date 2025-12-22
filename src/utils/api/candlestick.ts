import type { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";
import { API } from "./type";

export default class Candlestick extends API {
  constructor(notification: NotificationApiInjection) {
    super(notification);
  }

  async Finviz(
    symbol: string,
    space:
      | "d1"
      | "d5"
      | "m1"
      | "m3"
      | "m6"
      | "ytd"
      | "y1"
      | "y2"
      | "y5"
      | "max" = "d1",
    interval: "i1" | "i3" | "i5" | "d1" = "i1",
    response_done: (response: Response) => void = () => {},
  ) {
    const body = {
      symbol,
      space: space,
      interval: interval,
    };
    return await this.post("/api/candlestick/finviz", body, response_done);
  }
}
