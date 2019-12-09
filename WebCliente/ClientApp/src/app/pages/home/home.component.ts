import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../../global';
import { NavMenuComponent } from '../../components/nav-menu/nav-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(NavMenuComponent) child: NavMenuComponent;
  
  atividade: boolean = false;
  constructor(private router: Router, private global: Global) { }

  ngOnInit() {

  }

  feedback(clickMenu) {
    this.atividade = !this.atividade;
    this.child.feedback(clickMenu);
  }
}
