import type { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";
import { API } from "./type";

export default class Calendar extends API {
  constructor(notification: NotificationApiInjection) {
    super(notification);
  }

  async IPO_Iposcoop(response_done: (response: Response) => void = () => {}) {
    return await this.get("/api/calendar/ipo/iposcoop", {}, response_done);
  }

  async SPAC_Research(response_done: (response: Response) => void = () => {}) {
    return await this.get("/api/calendar/spac/research", {}, response_done);
  }
}
