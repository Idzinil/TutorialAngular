import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  //Se modifica el constructor con un parámetro que declare una propiedad pública messageService
  //Angular inyectará esa propiedad cuando cree el messagesComponent. Y la prop debe ser pública
  //para hacer el bindeo en la plantilla. Angular solo binds propiedades de componentes públicos
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
