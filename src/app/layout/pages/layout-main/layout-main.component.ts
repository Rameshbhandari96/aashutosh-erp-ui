import { Component, inject } from '@angular/core';
import { LayoutNavbarTopComponent } from '../layout-navbar-top/layout-navbar-top.component';
import { LayoutNavbarVerticalComponent } from '../layout-navbar-vertical/layout-navbar-vertical.component';
import { LayoutSearchBoxModalComponent } from '../layout-search-box-modal/layout-search-box-modal.component';
import { LayoutThemeSettingsComponent } from '../layout-theme-settings/layout-theme-settings.component';
import { RouterOutlet } from '@angular/router';
import { TemplateSettings } from '../../../core/models/template-settings';
import { JwtService } from '../../../core/services/jwt-service/jwt.service';
import { ThemeService } from '../../../core/services/theme-settings/theme-settings.service';
import { LayoutService } from '../../services/layout.service';
import { MenuService } from '../../services/menu.service';
declare let window: any;

@Component({
  selector: 'app-layout-main',
  imports: [
    LayoutNavbarTopComponent,
    LayoutNavbarVerticalComponent,
    LayoutSearchBoxModalComponent,
    LayoutThemeSettingsComponent,
    RouterOutlet
  ],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.css'
})
export class LayoutMainComponent {
  menus: any[] = [];
  isLoading:boolean=true;

  templateSettings:TemplateSettings=new TemplateSettings();
  
  private jwtService=inject(JwtService);
  private themeService =inject(ThemeService);
  private layoutService = inject(LayoutService)
  private menuService =inject(MenuService);

  loggedUserId:string='';
  verticalNavApperance:string='';
  topNavApperance:string='';
  themeApperance:string='';
  themeTopApperance:string='';
  isVerticalNavbarCollapsed:boolean=false;

  // ngAfterViewInit(): void {
  //   if (window.feather) {
  //     window.feather.replace(); // Initialize Feather icons
  //   }
  // }
  ngAfterViewChecked(): void {
    if (window.feather) {
      window.feather.replace(); // Initialize Feather icons
    }
  }
  ngOnInit(): void {
    this.verticalNavApperance=localStorage.getItem('phoenixNavbarVerticalStyle')||this.templateSettings.phoenixNavbarVerticalStyle;
    this.topNavApperance=localStorage.getItem('phoenixNavbarTopStyle')|| this.templateSettings.phoenixNavbarTopStyle;
    this.themeApperance=localStorage.getItem('phoenixTheme')||this.templateSettings.phoenixTheme;
    this.isVerticalNavbarCollapsed = localStorage.getItem('phoenixIsNavbarVerticalCollapsed') === 'true'|| this.templateSettings.phoenixIsNavbarVerticalCollapsed;
    this.themeTopApperance=(this.themeApperance=="auto")?this.templateSettings.phoenixTheme:this.themeApperance;
    
    this.menuService.getUserMenus().subscribe({
      next: (data:any) => {
        this.menus = data;
        this.isLoading = false;
      },
      error: (error:any) => {
        this.isLoading = false;
      }
    });
  }
  
  loadThemeSetting(themeSetting: TemplateSettings): void {
    this.themeService.loadThemeSetting(themeSetting);
  }
  public onThemeChange(theme:string){
    switch(theme){
      case 'reset':this.onResetSetting();break;
      default:this.onUpdateTheme(theme);break;
    }
  }
  onVerticalNavChange(theme:string):void{
    const loggedUserId=this.jwtService.getUserIdFromToken();
    const updateTheme:any={
      "userId": loggedUserId,
      "phoenixNavbarVerticalStyle":theme
    }
    this.verticalNavApperance=theme;
    this.themeService.loadVerticalNavApperance(theme);
    this.layoutService.updatePhoenixTheme(updateTheme).subscribe();
  }
    
  public onTopNavChange(theme:string){
    const loggedUserId=this.jwtService.getUserIdFromToken();
    const updateTheme:any={
      "userId": loggedUserId,
      "phoenixNavbarTopStyle":theme
    }
    this.topNavApperance=theme;
    this.themeService.loadHorizontalNavApperance(theme);
    this.layoutService.updatePhoenixTheme(updateTheme).subscribe();
  }
  private onResetSetting():void{
    const loggedUserId=this.jwtService.getUserIdFromToken();
    this.templateSettings.userId = loggedUserId;
    this.themeTopApperance=this.templateSettings.phoenixTheme;
    this.themeApperance=this.templateSettings.phoenixTheme;
    this.loadThemeSetting(this.templateSettings);
    this.layoutService.updatePhoenixTheme(this.templateSettings).subscribe();
  }
  private onUpdateTheme(theme:string):void{
    const loggedUserId=this.jwtService.getUserIdFromToken();
    const updateTheme:any={
      "userId": loggedUserId,
      "phoenixTheme":theme
    }
    this.themeTopApperance=(theme=="auto")?this.templateSettings.phoenixTheme:theme;
    this.themeApperance=theme;
    this.themeService.loadPhoenixTheme(theme);
    this.layoutService.updatePhoenixTheme(updateTheme).subscribe();
  }
  onToggleCollapsedNavBar(isCollapsed:boolean):void{
    const loggedUserId=this.jwtService.getUserIdFromToken();
    const updateTheme:any={
      "userId": loggedUserId,
      "phoenixIsNavbarVerticalCollapsed":isCollapsed
    }
    this.themeService.loadVerticalNavbarCollapsed(isCollapsed)
    this.layoutService.updatePhoenixTheme(updateTheme).subscribe();
  }
}
