import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user/user';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { MatCardModule } from '@angular/material/card';
import { ChangePasswordFormComponent } from '../change-password-form/change-password-form.component';
import { DatePipe } from '@angular/common';
import { AuthRequest } from '../../../models/auth/auth-request';
import { UpdateUserRequest } from '../../../models/user/update-user-request';
import { ChangeEmailFormComponent } from '../change-email-form/change-email-form.component';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatDialogModule, MatCardModule, ChangePasswordFormComponent, ChangeEmailFormComponent, DatePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  public user: User | null = null;

  public constructor(private dialog: MatDialog, private userService: UserService, private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.loadUser(userId);
    }
  }

  private loadUser(userId: number): void {
    this.userService.getUserById(userId).subscribe((user: User) => {
      this.user = user;
    });
  }

  protected onChangePassword(passwordData: { oldPassword: string, newPassword: string }): void {
    this.openConfirmationDialog('Are you sure you want to change your password? After the changes you will be looged out.').afterClosed().subscribe((confirmed) => {
      if (confirmed && this.user) {
        const authRequest: AuthRequest = { email: this.user.email, password: passwordData.oldPassword };
        const updateUserRequest: UpdateUserRequest = { email: this.user.email, password: passwordData.newPassword };

        this.userService.updateUser(this.user.id, authRequest, updateUserRequest).subscribe(() => {
          this.authService.logout();
          this.router.navigate(['/auth/sign-in']);
        });
      }
    });
  }

  protected onChangeEmail(emailData: { currentPassword: string, newEmail: string }): void {
    this.openConfirmationDialog('Are you sure you want to change e-mail? After the changes you will be looged out.').afterClosed().subscribe((confirmed) => {
      if (confirmed && this.user) {
        const authRequest: AuthRequest = { email: this.user.email, password: emailData.currentPassword };
        const updateUserRequest: UpdateUserRequest = { email: emailData.newEmail, password: emailData.currentPassword };

        this.userService.updateUser(this.user.id, authRequest, updateUserRequest).subscribe(() => {
          this.authService.logout();
          this.router.navigate(['/auth/sign-in']);
        });
      }
    });
  }

  private openConfirmationDialog(message: string): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message }
    });
  }
}
