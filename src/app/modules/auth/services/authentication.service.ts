import { inject, Injectable } from '@angular/core';
import { HttpClientHelperService } from '../../../core/services/http-client-helper/http-client-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  httpService = inject(HttpClientHelperService)

  login(credentials: any){
    return this.httpService.post<any>("auth-gate/auth/login", credentials);
  }

}
