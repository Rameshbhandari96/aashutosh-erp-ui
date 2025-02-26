import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReplacePipe } from '../../../core/pipes/replace.pipe';
import { CommonModule, LowerCasePipe } from '@angular/common';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-layout-navbar-vertical',
  imports: 
  [
    ReplacePipe,
    LowerCasePipe,
    CommonModule,
    NgxSkeletonLoaderComponent
  ],
  templateUrl: './layout-navbar-vertical.component.html',
  styleUrl: './layout-navbar-vertical.component.css'
})
export class LayoutNavbarVerticalComponent {
  @Input() menus: any[] = [];
  @Input() isLoading: boolean = false;
  @Input() isCollapsedVerticalNavbar: boolean = false;

  @Output() onClickCollapsed:EventEmitter<boolean>=new EventEmitter<boolean>();

  onClickCollapsedNavbar(){
    this.isCollapsedVerticalNavbar=!this.isCollapsedVerticalNavbar;
    this.onClickCollapsed.emit(this.isCollapsedVerticalNavbar);
  }
}
