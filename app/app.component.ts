import {Component} from '@angular/core';
 
@Component({
    selector: 'my-app',
    templateUrl: 'app/views/home.html' 
})
 
export class AppComponent {
	public title: string;
	public description: string;

	constructor(){
		this.title = 'APP FAVORITOS @litoos11';
		this.description = 'Aplicación web SPA con Angular 2 para gestionar favoritos online';
	}
}