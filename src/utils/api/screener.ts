import type { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";
import { API } from "./type";

export default class Screener extends API {
  constructor(notification: NotificationApiInjection) {
    super(notification);
  }

  async Finviz(
    query: string,
    response_done: (response: Response) => void = () => {},
  ) {
    return this.post(
      "/api/screener/finviz",
      {
        query,
      },
      response_done,
    );
  }
}
