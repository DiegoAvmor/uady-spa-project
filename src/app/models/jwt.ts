import { JwtHeader } from "./jwt-header";
import { JwtPayload } from "./jwt-payload";

export class Jwt {
  constructor(private jwtText: string) {}

  private getHeaderText(): string {
    return this.jwtText.split(/[.]/)[0];
  }

  private getPayloadText(): string {
    return this.jwtText.split(/[.]/)[1];
  }

  get header(): JwtHeader {
    return JSON.parse(atob(this.getHeaderText()));
  }

  get payload(): JwtPayload {
    return JSON.parse(atob(this.getPayloadText()));
  }

  get token(): string {
    return this.jwtText;
  }
}
