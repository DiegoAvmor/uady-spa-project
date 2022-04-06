import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl:string = environment.apiUrl;

  constructor() { }
}
