import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private apiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  constructor(private http: HttpClient) {}

  getNearbyPlaces(latitude: number, longitude: number): Observable<any> {
    const radius = 5000; // Radio en metros para buscar lugares cercanos
    const types = 'restaurant|cafe|bar|establishment|point_of_interest'; // Tipos de lugares a buscar (puedes modificarlos según tus necesidades)
    const apiKey = environment.googleMapsApiKey;

    const url = `${this.apiUrl}?location=${latitude},${longitude}&radius=${radius}&types=${types}&key=${apiKey}`;

    return this.http.get(url);
  }
}