import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FavoritoService } from '../services/favorito.service';
import { Favorito } from '../models/favorito';

 
@Component({
    selector: 'favorito-detail',
    templateUrl: 'app/views/favorito-detail.html',
    providers: [FavoritoService]
})
 
export class FavoritoDetailComponent implements OnInit{
	public favorito: Favorito;
	public errorMessage;
	
	constructor(
		private _favoritoService: FavoritoService,
		private _route: ActivatedRoute,
		private _router: Router
	){ }

	ngOnInit(){
		this.getFavorito();
	}

	getFavorito(){
		this._route.params.forEach((params: Params)=>{
			let id = params['id'];

			this._favoritoService.getFavorito(id).subscribe(
				(response)=>{
					this.favorito = response.favorito;
					if(!this.favorito){
						this._router.navigate(['/']);
					}
					console.log(this.favorito)
				},
				(error)=>{
					this.errorMessage = <any>error;
					if(this.errorMessage != null){
						console.log(`Error: ${this.errorMessage}`);
						alert('Error en la petición');
					}
				}
			)
		})
	}	
}