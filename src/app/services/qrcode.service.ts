import { environment as env } from "../../environments/environment";
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  private hostUrl: string = env.host;
  private qrUlr: string = env.api.qr.url;

  buildqrcode(query: string): string {
    return this.qrUlr + `/create-qr-code/?size=150x150&data=` + this.hostUrl + query;
  }

}
