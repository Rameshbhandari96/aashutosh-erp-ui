import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { JwtService } from '../../../../core/services/jwt-service/jwt.service';
import { ThemeService } from '../../../../core/services/theme-settings/theme-settings.service';
import { TemplateSettings } from '../../../../core/models/template-settings';
import { Login } from '../../models/login.model';


@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private subscriptions: Subscription[] = [];
  

  username = '';
  password = '';
  isPasswordVisible : boolean = false;
  domain = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthenticationService, private router : Router){}
  jwtService=inject(JwtService);
  themeService =inject(ThemeService);
  
  ngOnInit() {
    this.errorMessage = '';
  }
  templateSettings :TemplateSettings=new TemplateSettings();

  login() : void {
    this.isLoading = true;
    this.errorMessage = '';

    const credentials: Login = {
      username: this.username,
      password: this.password,
      domain: this.domain
    };

    this.subscriptions.push(this.authService.login(credentials).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        localStorage.setItem("token", response.token);
        this.router.navigateByUrl('dashboard');
      },
      error: (error: any) => {
        this.isLoading = false;
        this.errorMessage = error.message;  // Display the error message returned from the service
        console.error('Login Failed:', error);
      }
    }));
    
  }
  setTokenInLocalStorage(token: string): Promise<void> {
    return new Promise((resolve) => {
      localStorage.setItem('token', token);
      resolve();
    });
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    
    const icon = document.getElementById('toggle-password-icon');
    if (icon) {
      const action = this.isPasswordVisible ? ['fa-eye-slash', 'fa-eye'] : ['fa-eye', 'fa-eye-slash'];
      icon.classList.replace(action[0], action[1]);
    }
  }

  //use this approach for prevent memory leaks and ensures that all resources are properly released when the component is destroyed
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription=>subscription.unsubscribe());
    this.subscriptions=[];
  }
}
