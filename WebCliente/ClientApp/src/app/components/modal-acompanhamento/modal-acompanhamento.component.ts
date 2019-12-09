import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import Swal from 'sweetalert2';
import { NgxViacepService, Endereco, ErroCep, ErrorValues, NgxViacepModule } from '@brunoc/ngx-viacep';
import { Global } from '../../global';
import { ApiService } from '../../services/api.service';

import {
  Router,
  NavigationStart,
  NavigationEnd,
  ActivatedRoute,
  Event as NavigationEvent
} from "@angular/router";


@Component({
  selector: 'app-modal-acompanhamento',
  templateUrl: './modal-acompanhamento.component.html',
  styleUrls: ['./modal-acompanhamento.component.css']
})


export class ModalAcompanhamentoComponent implements OnInit {

  ativo: any;

  acompanhamento: any = {};
  escala_acompanhamento: any = {};

  diario_freq: any = {};
  currentUser: any = {};

  setor: any = {};
  turno: any = {};
  gerente: any = {};
  listaSetores: any = [];
  listaTurnos: any = [];
  listaGerentes: any = [];
  loading = false;
  visualizando: any = false;
  edita: any = false;

  constructor(
    private apiService: ApiService,
    public global: Global,
    public dialog: MatDialog,
    private router: Router,
    public viaCEP: NgxViacepService,
    public dialogRef: MatDialogRef<ModalAcompanhamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
      this.acompanhamento = data;
      this.obterDiarioFrequencia();

  }

  ngOnInit() {
    
  }

  fechaModal() {
    this.dialogRef.close();
  }

  obterDiarioFrequencia() {
    this.loading = true;
    this.apiService.Get("DiarioFrequencias/Funcionarios/" + this.acompanhamento.funcionario_id + "?data=" + this.acompanhamento.data).then(
      
      result => {
        this.escala_acompanhamento = result;
        
        //acerto de horas
        let hour = (this.escala_acompanhamento.total_horas.split(':'))[0];
        let min = (this.escala_acompanhamento.total_horas.split(':'))[1];
        let seg = (this.escala_acompanhamento.total_horas.split(':'))[2];
        seg = Math.round(seg);
        this.escala_acompanhamento.total_horas = hour+':'+min+':'+seg;
        // fim do acerto de horas
        
        this.loading = false;
      },
      
      err => {
        this.loading = false;
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.error.mensagem
        });
      }
    );
  }


  obterTurnos() {
    this.loading = true;
    this.apiService.Get("Turno?ativo=true").then(
      result => {
        this.listaTurnos = result;
        this.loading = false;
      },
      err => {
        this.loading = false;
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.error.mensagem
        });
      }
    );

  }

}
