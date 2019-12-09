import { Component, OnInit, NgModule, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import Swal from 'sweetalert2';
import { ApiService } from '../../services/api.service';
import { Global } from '../../global';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  ActivatedRoute,
  Event as NavigationEvent
} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  currentUser: any = {};
  
  gatilho: boolean = false;
  @Output() botao = new EventEmitter();

  constructor(
    private apiService: ApiService,
    public global: Global,
    public dialog: MatDialog,
    private router: Router,
  ) {

  }
  ngOnInit() {
  }
  escondeMenu() {
    this.gatilho = !this.gatilho;
    this.botao.emit(this.gatilho);
  }

}
