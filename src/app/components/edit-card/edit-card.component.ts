import {Component, Input, OnInit} from '@angular/core';
import {CardService} from '../../card.service';
import { ICard } from '../../card.service';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  @Input() card: CardService;

  public form: {
    name: string;
    path: string;
    password: string;
  };

  public cards: ICard[];

  private cardService: CardService;

  constructor(
    cardService: CardService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.cardService = cardService;
    this.cards = [];
    this.form = {
      name: '',
      password: '',
      path: ''
    };
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.location.back();
  }
  ngOnInit(): void {
    this.editCard();
  }

  editCard(): void {
    const id = +this.route.snapshot.params.id;
    // const url: string = this.route.snapshot.url.join('');
    // this.cardService.editCard(id);
    // console.log(id);
      // .subscribe(card => this.card = card);
  }



}
