import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var window: any;

@Component({
  selector: 'app-apis',
  standalone: true,
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.scss'],
})
export class ApisComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getToken().then((data) => {
      console.log("Token",data);
    });
    this.getTrackById('Jg36mEp').then((data) => {
      console.log("ById",data);
    });

    this.getTrackByTitle('buenas').then((data) => {
      console.log("TrackByTitle",data);
      return data;
    }).then((track:any) => {
      console.log("Track",track);
      this.getStreamUrl(track.data[0].id).then((url) => {
        console.log("URL",url);
      });
    });
  }

  async getToken(): Promise<Object> {
    return await window['getToken']();
  }

  async getTrackById(id: string): Promise<Object> {
    return await window['searchTrackById'](id);
  }
  async getStreamUrl(id:string): Promise<Object> {
    return await window['getStreamUrl'](id);
  }
  async getTrackByTitle(title: string): Promise<Object> {
    return await window['getTrackByTitle'](title);
  }

  
}
/**
 * Ejemplo de petición a una API con encabezado http
 */
/*makeApiRequest(): void {
    const apiUrl = 'https://countryapi.io/api/name/spain';
    const apiKey = '3SZpf87MgiUjeI1iSQ6XFZhxhwc8ms2Ubkczft4B'; // Reemplaza con tu clave de API real

    const headers = new HttpHeaders({
      Authorization: `Bearer ${apiKey}`,
    });

    this.httpClient.get(apiUrl, { headers }).subscribe(
      (data) => {
        console.log('Respuesta de la API:', data);
        // Aquí puedes manejar la respuesta de la API
      },
      (error) => {
        console.error('Error al hacer la solicitud a la API:', error);
        // Aquí puedes manejar errores
      }
    );
  }*/