import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { Data } from '../../interfaces/user.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnDestroy, OnInit {

  public user = signal<Data>({
    id: 1,
    email: 'george.buth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  });

  public fullName = computed(() => `${this.user().first_name} ${this.user().last_name}`);
  public counter = signal(10);

  public userChangeEffect = effect( () => {
    console.log(`${this.user().first_name} - ${this.counter()}`);

  });

  ngOnInit(): void {
    setInterval( () => {
      this.counter.update(current => current + 1);
      if (this.counter() == 15)
        this.userChangeEffect.destroy();
    }, 1000);
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  public onFieldUpdated (field: keyof Data, value: string) {

    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });

    // this.user.update( current => ({...current, [field]: value}) )

    this.user.update( current => {

      switch (field) {
        case 'email':
          current.email = value;
          break;
        case 'avatar':
          current.avatar = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'id':
          current.id = Number(value);
          break;
      }

      return current;
    })
  }

  public increaseBy(value: number) {
    this.counter.update(current => current + 1);
  }
}
