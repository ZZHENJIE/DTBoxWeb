import type { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";
import { API } from "./type";

export default class Event extends API {
  constructor(notification: NotificationApiInjection) {
    super(notification);
  }

  async Finviz(
    event: "News" | "Blogs" | "Stock" | "ETF",
    response_done: (response: Response) => void = () => {},
    symbol: string | null = null,
  ) {
    const body = { [event]: symbol };
    return await this.post("/api/event/finviz", body, response_done);
  }
}
