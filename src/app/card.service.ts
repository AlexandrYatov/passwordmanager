import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { LocalStorageService } from './local-storage.service';
// import {tap} from 'rxjs/operators';


export interface ICard {
  id: number;
  name: string;
  path: string;
  password: string;
}

@Injectable()
export class CardService {

  public form: {
    id: string;
    name: string;
    path: string;
    password: string;
  };

  private localStorageService: LocalStorageService;

  constructor( localStorageService: LocalStorageService ) {

    this.localStorageService = localStorageService;

  }

  public createCard( name: string, path: string, password: string): Observable<number> {

    const cards = this.loadCards();
    const card = {
      id: ( new Date() ).getTime(),
      name: name,
      path: path,
      password: password

    };

    this.localStorageService.setItem( 'cards', cards.concat( card ) );

    return( Observable.of( card.id ) );

  }

  public getCards(): Observable<ICard[]> {

    return( Observable.of( this.loadCards() ) );

  }

  // public editCard( id: number ): Observable<void> {
  //   const  cards = this.loadCards();
  //   const cardIndex = cards.findIndex(
  //     ( item: ICard ): boolean => {
  //       return( item.id === id );
  //     }
  //   );
  //   if ( cardIndex >= 0 ) {
  //     // cards = cards.slice();
  //     // cards.splice( cardIndex, 1 );
  //     this.localStorageService.setItem( 'cards', cards );
  //     return( Observable.of( null ) );
  //   } else {
  //     return( Observable.throw( new Error( 'Not Found' ) ) );
  //   }
  // }

  public removeCard( id: number ): Observable<void> {

    const cards = this.loadCards();
    const cardIndex = cards.findIndex(
      ( item: ICard ): boolean => {
        return( item.id === id );
      }
    );

    if ( cardIndex >= 0 ) {

      // cards = cards.slice();
      cards.splice( cardIndex, 1 );

      this.localStorageService.setItem( 'cards', cards );

      return( Observable.of( null ) );

    } else {

      return( Observable.throw( new Error( 'Not Found' ) ) );

    }

  }

  private loadCards(): ICard[] {

    const cards = <ICard[]>this.localStorageService.getItem( 'cards' );
    return( cards || [] );

  }
  // private addCard(card: ICard): Observable<ICard> {
  //   return this.<ICard>(this.localStorageService.getItem('cards'), card).pipe(
  //     tap((card: ICard) => this.log(`added hero w/ id=${card.id}`))
  //   );
  // }


}
