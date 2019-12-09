import { Component, OnInit, Input, Output } from '@angular/core';
import { Global } from '../../global';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent implements OnInit {

  nomeMenu: string = '';
  atividade: boolean = false;

  constructor(
    public global: Global,
  ) {

  }

  ngOnInit() {
  }

  abrirMenu(menuNome) {
    if (this.nomeMenu == menuNome)
      this.nomeMenu = '';
    else
      this.nomeMenu = menuNome;
  }

  
  feedback(clickMenu) {
    this.atividade = !this.atividade;
  }

}
