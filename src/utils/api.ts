import type { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";

class API {
  notification: NotificationApiInjection;

  constructor(notification: NotificationApiInjection) {
    this.notification = notification;
  }

  async post(
    url: string,
    body: object = {},
    response_done: (response: Response) => void = () => {},
  ) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    response_done(response);
    const json = await response.json();

    if (!response.ok) {
      const error = json.error as string;
      const idx = error.indexOf(":");
      const errType = idx === -1 ? error : error.slice(0, idx);
      const errMsg = idx === -1 ? "" : error.slice(idx + 1);
      this.notification.error({
        title: errType,
        content: errMsg,
        meta: new Date().toLocaleString(),
      });
      return {};
    }

    return json;
  }
}

export class Calendar extends API {
  constructor(notification: NotificationApiInjection) {
    super(notification);
  }

  async IPO_Iposcoop(response_done: (response: Response) => void = () => {}) {
    return await this.post("/api/calendar/ipo/iposcoop", {}, response_done);
  }

  async SPAC_Research(response_done: (response: Response) => void = () => {}) {
    return await this.post("/api/calendar/spac/research", {}, response_done);
  }
}

export class Event extends API {
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

export class Candlestick extends API {
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

export class User extends API {
  constructor(notification: NotificationApiInjection) {
    super(notification);
  }

  async Register(
    name: string,
    password: string,
    response_done: (response: Response) => void = () => {},
  ) {
    const body = {
      name,
      password,
    };
    return await this.post("/api/user/register", body, response_done);
  }

  async SignIn(
    name: string,
    password: string,
    response_done: (response: Response) => void = () => {},
  ) {
    const body = {
      name,
      password,
    };
    return await this.post("/api/user/signin", body, response_done);
  }
}
