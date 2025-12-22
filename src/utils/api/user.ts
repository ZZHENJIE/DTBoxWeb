import type { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";
import { API } from "./type";

export default class User extends API {
  constructor(notification: NotificationApiInjection) {
    super(notification);
  }

  async NameIsExists(name: string) {
    return await this.post("/api/user/name_is_exists", {
      name,
    });
  }

  async Register(
    name: string,
    password: string,
    response_done: (response: Response) => void = () => {},
  ) {
    return await this.post(
      "/api/user/register",
      {
        name,
        password,
      },
      response_done,
    );
  }

  async SignIn(
    name: string,
    password: string,
    response_done: (response: Response) => void = () => {},
  ) {
    return await this.post(
      "/api/user/signin",
      {
        name,
        password,
      },
      response_done,
    );
  }
}
