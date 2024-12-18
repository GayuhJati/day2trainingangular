import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  standalone: false,
  
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  constructor(private authService:AuthService, private router:Router) { }

  email = '';
  password = '';
  confirmPassword = '';

  async onRegister(form:any): Promise<void>  {
    console.log("onregister",form.value);
    try {
      console.log("testregister",this.email);
      await this.authService.register(this.email, this.password);
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  async onLogin(form:any): Promise<void>  {
    console.log("onlogin jalan",form.value);
    try {
      console.log("testlogin",this.email);
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error)
    }

  }

  isLoginSection:boolean = true;

  currentPage: string = 'login'; // Set halaman default

  switchLoginSection(page: string): void {
    this.currentPage = page;
    this.isLoginSection = !this.isLoginSection;
  }

}
