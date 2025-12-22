import type { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";

export class API {
  notification: NotificationApiInjection;

  constructor(notification: NotificationApiInjection) {
    this.notification = notification;
  }

  async get(
    url: string,
    params: object = {},
    response_done: (response: Response) => void = () => {},
  ) {
    const new_url = new URL(url, location.origin);
    Object.entries(params).forEach(([k, v]) =>
      new_url.searchParams.set(k, String(v)),
    );
    const response = await fetch(new_url, {
      method: "GET",
    });
    response_done(response);
    return this.response_done(response);
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
    return this.response_done(response);
  }

  async response_done(response: Response): Promise<boolean | object | null> {
    const json = await response.json();
    if (!response.ok) {
      this.error_notification(response.status, json.error);
      return null;
    }
    return json;
  }

  error_notification(error_code: number, error: string) {
    const meta = new Date().toLocaleString();
    if (error.includes(":")) {
      const idx = error.indexOf(":");
      const errType = idx === -1 ? error : error.slice(0, idx);
      const errMsg = idx === -1 ? "" : error.slice(idx + 1);
      this.notification.error({
        title: `${error_code}:${errType}`,
        content: errMsg,
        meta,
      });
    } else {
      this.notification.error({
        title: `${error_code}:Fetch Error`,
        content: error,
        meta,
      });
    }
  }
}
