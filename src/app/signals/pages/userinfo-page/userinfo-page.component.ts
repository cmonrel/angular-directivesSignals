import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { Data } from '../../interfaces/user.interface';

@Component({
  templateUrl: './userinfo-page.component.html',
  styleUrl: './userinfo-page.component.css'
})
export class UserinfoPageComponent implements OnInit {

  private usersService = inject(UserServiceService);

  public userId = signal(1);
  public currentUser = signal<Data | undefined>(undefined);
  public userWasFound = signal(true);
  public fullName = computed<string>(() => {
    if (!this.currentUser()) return 'Usuario no encontrado'
    return `${this.currentUser()!.first_name} ${this.currentUser()!.last_name}`
  })

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  public loadUser (id: number): void {
    if (id <= 0) return;

    this.userId.set(id);
    this.currentUser.set(undefined);

    this.usersService.getUserById(id)
      .subscribe({
        next: (user) => {
          this.currentUser.set(user);
        },
        error: () => {
          this.userWasFound.set(false);
          this.currentUser.set(undefined);
        },
      });
  }
}
