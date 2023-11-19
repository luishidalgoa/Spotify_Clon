import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-apis',
  standalone: true,
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.scss'],
})
export class ApisComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.makeApiRequest();
  }

  makeApiRequest(): void {
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
  }
}
