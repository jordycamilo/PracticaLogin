import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment.development';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  protected http = inject(HttpClient);
  procteted apiUrl = environment.apiUrl;
  
}
