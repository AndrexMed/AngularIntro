import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface File{
  originalname: string
  filename: string
  location: string
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private APIURL = `${environment.API_URL3}/api/files`;

  //npm i file-saver
  //npm install @types/file-saver --save-dev TIPADO

  constructor(private http: HttpClient) { }

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: "blob" })
      .pipe(
        tap(content => {
          const blob = new Blob([content], { type })
          saveAs(blob, name)
        }),
        map(() => true)
      )
  }

  uploadFile(file: Blob) {
    const dto = new FormData()
    dto.append("file", file)
    return this.http.post<File>(`${this.APIURL}/upload`, dto, {
      // headers: {
      //   "Content-type": "multipart/form-data"
      // }
    })
  }
}
