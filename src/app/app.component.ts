import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nombre = "Andres"
  edad = 25
  img = "https://source.unsplash.com/random"

  btnDisabled = true

  Persona = {
    name: "El Gio",
    age: 25,
    avatar: "https://source.unsplash.com/random"
  }

  Register = {
    name: "xxx",
    email: "",
    pass: ""
  }

  Test = "Hello World"

  toggleButton() {
    this.btnDisabled = !this.btnDisabled
  }
  incrementarEdad() {
    this.Persona.age += 1
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement
  }

  changeH2(event: Event) {
    const element = event.target as HTMLInputElement
    this.Test = element.value
  }

  registrar() {
    console.log(this.Register)
  }

}
