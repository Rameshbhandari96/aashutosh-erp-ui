import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtService } from '../../../core/services/jwt-service/jwt.service';
import { FirstLetterCapitalizePipe } from '../../../core/pipes/first-letter-capitalize.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout-navbar-top',
  imports: [
              FirstLetterCapitalizePipe,
              CommonModule,
              FormsModule,
              RouterLink
            ],
  templateUrl: './layout-navbar-top.component.html',
  styleUrl: './layout-navbar-top.component.css'
})
export class LayoutNavbarTopComponent implements OnInit{
  isDarkTheme: boolean=true;
  private router =inject(Router);
  private toastrService =inject(ToastrService);
  private jwtService=inject(JwtService);
  
  @Input() themeName : string='';
  @Output() onTheme :EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.isDarkTheme=(this.themeName=='dark');
  }
  onLogOff():void{
    if(localStorage.getItem('token')!=null){
      localStorage.removeItem('token');
    } 
    this.router.navigateByUrl('');   
  }
  updateTopNavbarTheme():void{
    const phoenixTheme=(this.isDarkTheme)?'dark':'light';
    this.onTheme.emit(phoenixTheme);
  }
}
