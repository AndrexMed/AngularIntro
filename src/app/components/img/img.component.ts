import { Component, Input, Output, EventEmitter, OnInit, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  img: string = ""
  
  @Input("img")
  set changeImg(newImg: string){
    this.img = newImg
    console.log("change just img => ", this.img)
  }
  @Output() loaded = new EventEmitter<string>()

  // counter = 0
  // counterFn: number | undefined

  /*Ciclos de vida de componentes*/
  constructor() {
    //Corre antes del render - NO correr peticiones async - corre una sola vez
    console.log('Constructor', 'ImgValue =>', this.img);
  }


  ngOnChanges(changes: SimpleChanges): void {
    //Corre antes del render - evalua cambios - corre muchas veces
    console.log('OnChanges', 'ImgValue =>', this.img);
    console.log("changes: ", changes)
  }

  ngOnInit(): void {
    //Corre antes del render - SI podemos correr peticiones async - fetch - corre una sola vez
    console.log('ngOnInit', 'ImgValue =>', this.img);

    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1
    //   console.log("Counter")
    // }, 1000)
  }

  ngAfterViewInit(): void {
    //Corre despues del render - aca se manipulan los componentes hijos - relacionado con directivas
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    //Corre solo cuando se elimina un componente
    console.log('Se destruyo el componente img ngOnDestroy');
    // window.clearInterval(this.counterFn)
  }

  defaultImg = "./assets/images/default.png"

  errorImage() {
    this.img = this.defaultImg
  }

  imgLoaded() {
    console.log("Log Hijo")
    this.loaded.emit(this.img)
  }
}
