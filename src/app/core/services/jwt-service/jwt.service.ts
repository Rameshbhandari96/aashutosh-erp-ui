import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode'

// npm install jwt-decode


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() {}

  public getToken(): string | null {
      return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
      return this.getToken() !== null;
  }

  public getRoles(): string[] {
      const token = this.getToken();
      if (!token) return [];
      const decoded: any = jwtDecode(token);
      return decoded.roles || [];
  }

  public hasRole(role: string): boolean {
      const roles = this.getRoles();
      return roles.includes(role);
  }

  public getUserIdFromToken(): string {
      const token = this.getToken();
      if (!token) return '';
      const decoded: any = jwtDecode(token);
      return decoded.UserIdentifier || '';
  }
}