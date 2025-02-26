import { inject, Injectable, RendererFactory2 } from '@angular/core';
import { TemplateSettings } from '../../models/template-settings';
import { Observable } from 'rxjs';
import { HttpClientHelperService } from '../http-client-helper/http-client-helper.service';



@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(rendererFactory: RendererFactory2) {
    this.loadInitialSettings();
  }

  private httpService=inject(HttpClientHelperService);

  private loadInitialSettings(): void {
    this.applyThemeSettings();
    // Listen for storage changes across tabs
    window.addEventListener('storage', (event) => {
      if (event.key && event.key.startsWith('phoenix')) {
        this.applyThemeSettings();
      }
    });
  }

  loadThemeSetting(themeSetting: TemplateSettings): void {
    localStorage.setItem("phoenixIsNavbarVerticalCollapsed", JSON.stringify(themeSetting.phoenixIsNavbarVerticalCollapsed));
    localStorage.setItem("phoenixIsRTL", JSON.stringify(themeSetting.phoenixIsRTL));
    localStorage.setItem("phoenixNavbarPosition", themeSetting.phoenixNavbarPosition);
    localStorage.setItem("phoenixNavbarTopShape", themeSetting.phoenixNavbarTopShape);
    localStorage.setItem("phoenixNavbarTopStyle", themeSetting.phoenixNavbarTopStyle);
    localStorage.setItem("phoenixNavbarVerticalStyle", themeSetting.phoenixNavbarVerticalStyle);
    localStorage.setItem("phoenixSupportChat", JSON.stringify(themeSetting.phoenixSupportChat));
    localStorage.setItem("phoenixTheme", themeSetting.phoenixTheme);
    this.applyThemeSettings();
  }

  private applyThemeSettings(): void {
    const isNavbarVerticalCollapsed = JSON.parse(localStorage.getItem('phoenixIsNavbarVerticalCollapsed') || 'false');
    const theme = localStorage.getItem('phoenixTheme')!.replace(/^"|"$/g, '').trim();
    const navbarPosition = localStorage.getItem('phoenixNavbarPosition')!.replace(/^"|"$/g, '').trim();
    const phoenixNavbarTopStyle = localStorage.getItem('phoenixNavbarTopStyle')!.replace(/^"|"$/g, '').trim();
    const phoenixNavbarVerticalStyle = localStorage.getItem('phoenixNavbarVerticalStyle')!.replace(/^"|"$/g, '').trim();
    if (isNavbarVerticalCollapsed) {
      document.documentElement.classList.add('navbar-vertical-collapsed');
    } else {
      document.documentElement.classList.remove('navbar-vertical-collapsed');
    }
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else if (theme === 'auto') {
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-bs-theme', darkMode);
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
    if (navbarPosition === 'horizontal') {
      document.documentElement.setAttribute('data-navigation-type', 'horizontal');
    } else if (navbarPosition === 'combo') {
      document.documentElement.setAttribute('data-navigation-type', 'combo');
    } else {
      document.documentElement.removeAttribute('data-navigation-type');
    }
    const navbarVertical = document.querySelector('.navbar-vertical');
    if (navbarVertical) {
      navbarVertical.setAttribute('data-navbar-appearance',phoenixNavbarVerticalStyle);
    }
    const navbarTop = document.querySelector('.navbar-top');
    if (navbarTop) {
      navbarTop.setAttribute('data-navbar-appearance',phoenixNavbarTopStyle);
    }
  }

  getUserTheme(userId:string):Observable<any>{
    return this.httpService.get<any>(`settings-gate/theme-settings/${userId}`);
  }
  loadPhoenixTheme(themeName:string){
    localStorage.setItem('phoenixTheme',themeName);
    document.documentElement.setAttribute('data-bs-theme', themeName);
  }
  loadVerticalNavApperance(themeName:string){
    localStorage.setItem('phoenixNavbarVerticalStyle',themeName);
    document.querySelector('.navbar-vertical')!.setAttribute('data-navbar-appearance',themeName)
  }
  loadHorizontalNavApperance(themeName:string){
    localStorage.setItem('phoenixNavbarTopStyle',themeName);
    document.querySelector('.navbar-top')!.setAttribute('data-navbar-appearance',themeName);
  }
  loadVerticalNavbarCollapsed(isCollapsed:boolean):void{
    localStorage.setItem('phoenixIsNavbarVerticalCollapsed', JSON.stringify(isCollapsed));

    // Get the HTML element
    const htmlElement = document.querySelector('html');
  
    if (htmlElement) {
      // Add or remove the class based on the collapsed state
      if (isCollapsed) {
        htmlElement.classList.add('navbar-vertical-collapsed');
      } else {
        htmlElement.classList.remove('navbar-vertical-collapsed');
      }
    }
  }
}
