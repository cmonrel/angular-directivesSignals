import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Color } from '../../../../../05-pipesApp/src/app/products/interfaces/hero.interface';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[sharedCustomLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.showError();
  }

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  constructor( private el: ElementRef<HTMLElement>) {
    // console.log('Constructor directiva');
    this.htmlElement = el;

    this.htmlElement.nativeElement.innerHTML = "Hola Mundo";
    this.setStyle();
  }

  ngOnInit(): void {
    console.log('dir: ngoninit');
  }

  private setStyle():void {

    if (!this.htmlElement) return;
    this.htmlElement.nativeElement.style.color = this._color;
  }

  private showError(): void {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerHTML = 'Este campo es requerido'
    }
    if (errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerHTML = `El tamaño mínimo tiene que ser de ${min}, llevas ${current}`
    }
    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerHTML = 'No tiene formato email'
    }
  }

}
