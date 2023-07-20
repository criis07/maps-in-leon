import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from '../google-maps-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponent implements OnInit {
  latitude: number = 0;
  longitude: number = 0;
  apikey = environment.googleMapsApiKey;
  mapSrc: SafeResourceUrl = '';
  mapUrl: string = '';

  constructor(private mapsService: GoogleMapsService, private toastr: ToastrService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getNearbyPlaces();
          console.log(this.latitude);
          console.log(this.longitude);
          console.log(this.apikey);
    this.buildMapSrc();
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }

  getNearbyPlaces() {
    this.mapsService.getNearbyPlaces(this.latitude, this.longitude).subscribe(
      (data) => {
        // Procesar los datos y mostrar una notificación con los 5 lugares más cercanos
        const places = data.results.slice(0, 10).map((place: { name: any; }) => place.name);
        this.showNotification(places);
      },
      (error) => {
        console.error('Error getting nearby places:', error);
      }
    );
  }

  showNotification(places: string[]) {
    const message = `Lugares cercanos:\n${places.join('\n')}`;
    this.toastr.info(message, 'Lugares Cercanos', {
      timeOut: 50000 // Duración de la notificación en milisegundos
    });
  }
  buildMapSrc() {
    this.mapUrl = `https://www.google.com/maps/embed/v1/view?key=${this.apikey}&center=${this.latitude},${this.longitude}&zoom=18&maptype=roadmap`;
    this.mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
    console.log(this.mapSrc);
  }
}