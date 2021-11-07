import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  form: any = {
    password: null
  };
  isSuccessful = false;
  isUpdateFailed = false;
  errorMessage = '';
  successMessage = '';

  constructor(private token: TokenStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
  
  onSubmit(): void {
    const { password } = this.form;

    this.authService.updatePassword(password).subscribe(
      data => {
        this.successMessage = data.message;
        this.isSuccessful = true;
        this.isUpdateFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isUpdateFailed = true;
      }
    );
  }
}
