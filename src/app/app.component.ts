import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  anchoImagen = 10
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

  box = {
    width : 100,
    heigth : 100,
    background : "red"
  }

  Test = "Hello World"
  Test2 = "Hello World2"

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
