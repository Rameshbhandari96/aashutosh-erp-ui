import { inject, Injectable } from '@angular/core';
import { HttpClientHelperService } from '../../core/services/http-client-helper/http-client-helper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  httpService=inject(HttpClientHelperService);
  constructor() { }
  
  updatePhoenixTheme(obj:any):Observable<any>{
    return this.httpService.put<any>('settings-gate/theme-settings',obj);
  }
 
}
