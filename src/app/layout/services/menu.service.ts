import { inject, Injectable } from '@angular/core';
import { HttpClientHelperService } from '../../core/services/http-client-helper/http-client-helper.service';
import { Observable } from 'rxjs';
import { Menu } from '../../modules/auth/models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  httpService = inject(HttpClientHelperService)

  getAllMenus(): Observable<Menu[]>{
    return this.httpService.get<Menu[]>("auth-gate/menus");
  }
  getUserMenus(): Observable<Menu[]>{
    return this.httpService.get<Menu[]>("auth-gate/menus/user-menus");
  }
  addMenu(menu: Menu): Observable<any>{
    return this.httpService.post<any>(`auth-gate/menus`, menu);
  }
  updateMenu(menu: Menu): Observable<any>{
    return this.httpService.put<any>(`auth-gate/menus/${menu.id}`, menu);
  }
  deleteMenu(id: any): Observable<any>{
    return this.httpService.delete<any>(`auth-gate/menus/${id}`);
  }
}
