import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  //El servicio expone su caché
  messages: string[] = [];

  //Cuenta con dos métodos, uno que añade un msg en el caché y otro que limpia la caché
  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
