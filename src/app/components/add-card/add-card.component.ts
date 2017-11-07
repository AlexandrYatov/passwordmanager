import { Component, OnInit } from '@angular/core';

import { CardService } from '../../card.service';
import { ICard } from '../../card.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  public form: {
    name: string;
    path: string;
    password: string;
  };

  public cards: ICard[];

  private cardService: CardService;

  constructor( cardService: CardService ) {

    this.cardService = cardService;
    this.cards = [];
    this.form = {
      name: '',
      password: '',
      path: ''
    };

  }
  public addCard(): void {
    this.cardService
      .createCard( this.form.name, this.form.path, this.form.password )
      .subscribe(
        ( id: number ): void => {

          this.form.name = '';
          this.form.path = '';
          this.form.password = '';
          this.reload();
        }
      );
  }

  public ngOnInit(): void {
    this.reload();
  }

  public reload(): void {
    this.cardService
      .getCards()
      .subscribe(
        ( cards: ICard[] ): void => {

          this.cards = cards;

        }
      )
    ;
  }

  public remove( card: ICard ): void {

    this.cards = this.cards.filter(
      ( value: ICard ): boolean => {

        return( value !== card );

      }
    );

    this.cardService
      .removeCard( card.id )
      .subscribe(
        (): void => {
          this.reload();
        }
      );
  }

}
