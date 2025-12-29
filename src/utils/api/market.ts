import type { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";
import { API } from "./type";

export default class Market extends API {
  constructor(notification: NotificationApiInjection) {
    super(notification);
  }

  async cboe_book_view(
    value: "BYX" | "EDGA" | "BZX" | "EDGK",
    response_done: (response: Response) => void = () => {},
  ) {
    return await this.post(
      "/api/book_view/cboe",
      {
        market: value,
      },
      response_done,
    );
  }
}
