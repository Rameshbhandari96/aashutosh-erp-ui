import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-layout-theme-settings',
  imports: [],
  templateUrl: './layout-theme-settings.component.html',
  styleUrl: './layout-theme-settings.component.css'
})
export class LayoutThemeSettingsComponent {
  @Output() onTheme: EventEmitter<string> = new EventEmitter<string>();
  @Output() onVerticalNav: EventEmitter<string> = new EventEmitter<string>();
  @Output() onTopNav: EventEmitter<string> = new EventEmitter<string>();

  @Input() verticalNavbarApperance:string='';
  @Input() topNavbarApperance:string='';
  @Input() themeApperance:string='';

  onThemeChange(theme:string){
    this.onTheme.emit(theme);
  }
  onVerticalNavChange(theme:string){
    this.onVerticalNav.emit(theme);
  }
  onTopNavChange(theme:string){
    this.onTopNav.emit(theme);
  }
}
