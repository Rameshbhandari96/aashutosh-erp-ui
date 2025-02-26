import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedUserToken = localStorage.getItem('token');
  
  if (!loggedUserToken) {
    // Redirect to login if no token found
    router.navigateByUrl('login');
    return false;
  }

  try {
    const tokenPayload = JSON.parse(atob(loggedUserToken.split('.')[1])); // Decode JWT
    const tokenExpiration = tokenPayload.exp;
    
    if (Date.now() >= tokenExpiration * 1000) { 
      // Token expired, navigate to login
      localStorage.removeItem('token');
      router.navigateByUrl('login');
      return false;
    }
  } catch (error) {
    // In case of any error, navigate to login
    router.navigateByUrl('login');
    return false;
  }
  
  return true; // Allow navigation
};
