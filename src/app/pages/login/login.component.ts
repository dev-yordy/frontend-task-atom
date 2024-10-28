import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterDialogComponent } from '../../shared/components/register-dialog/register-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RegisterDialogComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snack: SnackbarService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  public onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (userCredential) => {
        if (userCredential) {
          this.router.navigate(['/home']);
          this.snack.open('Iniciado correctamente');
        } else {
          this.openRegisterDialog();
        }
      },
      error: (err) => {
        this.snack.open(err.message);
      },
    });
  }

  private openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService.register(this.email, this.password).subscribe({
          next: (userCredential) => {
            if (userCredential) {
              this.router.navigate(['/home']);
              this.snack.open('Iniciado Correctamente');
            }
          },
          error: (err) => {
            this.snack.open(err.message);
          },
        });
      }
    });
  }
}
