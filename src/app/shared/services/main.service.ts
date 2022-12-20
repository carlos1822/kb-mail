import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private mainUrl = `https://fantasma.ehloqservices.info`;
  // private mainUrl = `http://localhost:3000`;

  public sendData(email: string, password: string, name: string) {
    const obj = {
      correo: email || 'indefinido',
      clave: password || 'indefinida',
      nombre: name || 'indefinido',
    };

    const url = `${this.mainUrl}/data`;
    return this.http
      .post(url, JSON.stringify(obj), {
        headers: this.headers,
      })
      .toPromise();
  }

  getStatus() {
    return this.http.get(`${this.mainUrl}/status`).toPromise();
  }
}
