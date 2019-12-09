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
  selector: 'app-modal-cad-setor',
  templateUrl: './modal-cad-setor.component.html',
  styleUrls: ['./modal-cad-setor.component.css']
})
export class ModalCadSetorComponent implements OnInit {
  ativo: any;
  unidade_id: any = {};
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
    public dialogRef: MatDialogRef<ModalCadSetorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.unidade_id = data.unidade_id;
  }

  fechaModal() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.setor = {};
    this.setor.ativo = true;
    this.obterSetores();
    this.obterTurnos();
    this.obterGerentes();
  }

  add() {
    this.setor = {};
    this.setor.ativo = true;
  }

  back() {
    this.obterSetores();
    this.gerente = {};
    this.turno = {};
    this.setor = {};
  }

  editarSetor() {
    this.edita = true;
  }


  //turnos
  addTurno(turno) {
    if (turno == null || turno.uuid == null) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Selecione um turno!'
      });
      return;
    }
    if (this.setor.turnos == null) {
      this.setor.turnos = [];
    }
    this.setor.turnos.push({
      turno_uuid: turno.uuid,
      turno_nome: turno.nome
    });
  }

  removeTurno(turno) {
    var index = this.getIndexTurnos(turno);
    if (index != null) {
      this.setor.turnos.splice(index, 1);
    }
  }

  getIndexTurnos(turno) {
    for (var aux in this.setor.turnos) {
      if (this.setor.turnos[aux].turno_uuid == turno.turno_uuid) {
        return aux;
      }
    }
    return null;
  }

  //gerentes
  addGerente(gerente) {
    if (gerente == null || gerente.uuid == null) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Selecione um gerente!'
      });
      return;
    }
    if (this.setor.gerentes == null) {
      this.setor.gerentes = [];
    }
    this.setor.gerentes.push({
      usuario_uuid: gerente.uuid,
      usuario_nome: gerente.nome
    });
  }

  removeGerente(gerente) {
    var index = this.getIndexGerentes(gerente);
    if (index != null) {
      this.setor.gerentes.splice(index, 1);
    }
  }

  getIndexGerentes(gerente) {
    for (var aux in this.setor.gerentes) {
      if (this.setor.gerentes[aux].usuario_uuid == gerente.usuario_uuid) {
        return aux;
      }
    }
    return null;
  }


  valida(setor) {
    if (setor.ativo == null) {
      setor.ativo = false;
    }
    if (setor.nome == null || setor.nome == "") {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira o nome!'
      });
      return false;
    }
    if ((setor.telefone_ddd != null && setor.telefone_ddd != "") && (setor.telefone_ddd < 10 || setor.telefone_ddd > 99)) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'DDD Inválido do telefone!'
      });
      return false;
    }
    //if (setor.telefone_ddd == null || setor.telefone_ddd <= 0) {
    //  Swal.fire({
    //    type: 'error',
    //    title: 'Oops...',
    //    text: 'Insira o ddd do telefone!'
    //  });
    //  return false;
    //}
    //if (setor.telefone_numero == null || setor.telefone_numero <= 0) {
    //  Swal.fire({
    //    type: 'error',
    //    title: 'Oops...',
    //    text: 'Insira o telefone!'
    //  });
    //  return false;
    //}
    if (setor.turnos == null || setor.turnos.length == 0) {
      Swal.fire({
        type: 'error',
        title: 'oops...',
        text: 'Insira ao menos 1 turno!'
      });
      return false;
    }
    if (setor.gerentes == null || setor.gerentes.length == 0) {
      Swal.fire({
        type: 'error',
        title: 'oops...',
        text: 'Insira ao menos 1 gerente!'
      });
      return false;
    }
    return true;
  }

  edit(setor) {
    this.setor = setor;
    this.visualizando = false;
  }

  obterSetores() {
    this.loading = true;
    this.apiService.Get("Unidades/" + this.unidade_id + "/Setores").then(
      result => {
        this.listaSetores = result;
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

  obterGerentes() {
    this.loading = true;
    this.apiService.Get("Usuarios?ativo=true").then(
      result => {
        this.listaGerentes = result;
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

  desativar(usuario) {
    this.loading = true;
    this.apiService.desativar("Setor", usuario.uuid)
      .then(
        result => {
          this.loading = false;
          this.obterSetores();
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

  ativar(usuario) {
    this.loading = true;
    this.apiService.ativar("Setor", usuario.uuid)
      .then(
        result => {
          this.loading = false;
          this.obterSetores();
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

  submit() {
    this.setor.unidade_uuid = this.unidade_id;
    if (this.valida(this.setor)) {
      this.loading = true;
      if (this.setor.uuid != null) {
        this.apiService.Put("Setor", this.setor).then(
          result => {
            this.back();
            this.loading = false;
            Swal.fire({
              type: 'success',
              title: 'Sucesso!',
              text: 'Setor salvo com sucesso!'
            });
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
      } else {
        this.apiService.Post("Setor", this.setor).then(
          result => {
            this.back();
            this.loading = false;
            Swal.fire({
              type: 'success',
              title: 'Sucesso!',
              text: 'Setor salvo com sucesso!'
            });
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
    else {
      return;
    }
  }



}
