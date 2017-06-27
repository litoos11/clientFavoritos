import {Component, OnInit} from '@angular/core';
import {FavoritoService} from '../services/favorito.service';
import {Favorito} from '../models/favorito';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'favoritos-list',
	templateUrl: 'app/views/favoritos-list.html',
	providers: [FavoritoService]
})

export class FavoritosListComponent implements OnInit{
	public title: string;
	public loading: boolean;
	 
	public favoritos: Favorito[];
	public errorMessage;

	public confirmado;
	
	constructor(
		private _favoritoService: FavoritoService
	){
		this.title = 'Listado de marcadores:';
		this.loading = true;
	}


	ngOnInit(){
		this.getFavoritos();
	}

	getFavoritos(){
		this._favoritoService.getFavoritos().subscribe(
			(response) => {
				// console.log('FavoritoListComponent cargado :-)');
				// console.log(result);
				this.favoritos = response.favoritos;

				if(!this.favoritos){
					alert('Error en el servidor');
				}else{
					this.loading = false;
				}

			},
			(error) => {
				this.errorMessage = <any>error;
				if(this.errorMessage != null){
					console.log(`Error: ${this.errorMessage}`);
					alert('Error en la petición');
				}
			}
		);
	}

	onBorrarConfirm(id){
		this.confirmado = id;
	}

	onCancelarConfirm(id){
		this.confirmado = null;
	}

	onBorrarFavorito(id){
		this._favoritoService.deleteFavorito(id).subscribe(
			(response) => {
				if(!response.message){
					alert('Error en la petición!!')
				}
				this.getFavoritos();
			},
			(error) => {
				this.errorMessage = <any>error;
				if(this.errorMessage != null){
					console.log(`Error: ${this.errorMessage}`);
					alert('Error en la petición');
				}
			}
		)
	}
}