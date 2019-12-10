import { Component, OnInit, NgModule } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import Swal from 'sweetalert2';
import { NgxViacepService, Endereco, ErroCep, ErrorValues, NgxViacepModule } from '@brunoc/ngx-viacep';
import { Global } from '../../../global';
import { ApiService } from '../../../services/api.service';
import { FilterPipe } from 'ngx-filter-pipe';

import {
  Router,
  NavigationStart,
  NavigationEnd,
  ActivatedRoute,
  Event as NavigationEvent
} from "@angular/router";
import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  novaPessoa: boolean = false;
  filtro: any = {};
  pessoa: any = {};
  endereco: any = {};
  loading = false;
  visualizando: any = false;
  listaPessoas: any = [];
  listaEstados: any = [];
  listaCidades: any = [];
  //imgSrc: any = '../../../../assets/img/default.jpg';
  element: HTMLImageElement;

  currentUser: any = {};


  //partes de testes de funcionários
  cabecalho: any = {};
  listaPaginas: any = [];
  indice_selecionado: any = 0;


  constructor(
    private apiService: ApiService,
    public global: Global,
    public dialog: MatDialog,
    private router: Router,
    public viaCEP: NgxViacepService,
    private filter: FilterPipe
  ) {

  }

  ngOnInit() {
    //this.obterPessoas();
    this.obterListaEstados();
    this.atual(1);

  }

  getFormatterDate(item) {
    return this.global.dateFormater(item);
  }

  add() {
    this.novaPessoa = true;
    this.pessoa = {};
    this.endereco = {};
    this.pessoa.ativo = true;
  }

  back() {
    this.atual(1);
    //this.obterPessoas();
    this.novaPessoa = false;
    //this.imgSrc = '../../../../assets/img/default.jpg';
    this.pessoa = {};
    this.endereco = {};
  }
  
  addEndereco(endereco) {
    if (endereco == null) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira o endereço!'
      });
      return;
    }
    if (endereco.rua == null || endereco.rua == "") {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira a rua!'
      });
      return;
    }
    if (endereco.numero == null || endereco.numero <= 0) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira o numero!'
      });
      return;
    }
    if (endereco.bairro == null || endereco.bairro == "") {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira o bairro!'
      });
      return;
    }
    //if (unidade.complemento == null || unidade.complemento == "") {
    //  Swal.fire({
    //    type: 'error',
    //    title: 'Oops...',
    //    text: 'Insira o complemento!'
    //  });
    //  return false;
    //}
    if (endereco.cidade_uuid == null) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira a cidade!'
      });
      return;
    }
    if (endereco.estado_uuid == null) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira o Estado!'
      });
      return;
    }

    if (this.pessoa.enderecos == null) {
      this.pessoa.enderecos = [];
    }
    endereco.estado = this.getNomeEstado(endereco.estado_uuid);
    endereco.cidade = this.getNomeCidade(endereco.cidade_uuid);
    this.pessoa.enderecos.push(endereco);
    this.endereco = {};
  }

  editEndereco(ender) {
    this.endereco = ender;
  }
  

  valida(pessoa) {
    if (pessoa.nome == null || pessoa.nome == "") {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira o nome!'
      });
      return false;
    }
    if (pessoa.sobrenome == null || pessoa.sobrenome == "") {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira o sobrenome!'
      });
      return false;
    }
    if (pessoa.cpf == null || pessoa.cpf == "") {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira o CPF!'
      });
      return false;
    }
    //if (pessoa.matricula == null || pessoa.matricula == "") {
    //  Swal.fire({
    //    type: 'error',
    //    title: 'Oops...',
    //    text: 'Insira a matricula!'
    //  });
    //  return false;
    //}
    if (pessoa.data_nascimento_str == null) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira a data de nascimento!'
      });
      return false;
    }
    let data_nascimento_ = new Date(pessoa.data_nascimento_str.split("/")[2] + "-" + pessoa.data_nascimento_str.split("/")[1] + "-" + pessoa.data_nascimento_str.split("/")[0] + "T00:00");
    if (data_nascimento_ > new Date()) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira a data de nascimento válida!'
      });
      return false;
    }

    if (data_nascimento_.toDateString() == 'Invalid Date') {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira a data de nascimento válida!'
      });
      return false;
    }

    pessoa.data_nascimento = data_nascimento_;
    
    if ((pessoa.telefone_ddd != null && pessoa.telefone_ddd != "") && (pessoa.telefone_ddd < 10 || pessoa.telefone_ddd > 99)) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'DDD Inválido do telefone!'
      });
      return false;
    }
    if (pessoa.telefone_numero == null || pessoa.telefone_numero <= 0) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira o telefone!'
      });
      return false;
    }
    
  }

  edit(pessoa) {
    this.novaPessoa = true;
    this.obterPessoa(pessoa);
    this.obterListaCidades2(pessoa.estado_uuid, pessoa.cidade_nome);
    //this.pessoa = pessoa;
    this.visualizando = false;

  }

  view(pessoa) {
    this.edit(pessoa);
    this.visualizando = true;
  }

  obterPessoas() {
    this.loading = true;
    this.apiService.Get("Pessoas").then(
      result => {
        this.listaPessoas = result;
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

  
  submit() {
    if (this.valida(this.pessoa)) {
      this.pessoa.cep = this.pessoa.cep.replace(/\D/g, '');
      this.loading = true;
      if (this.pessoa.uuid != null) {
        this.apiService.Put("Pessoas", this.pessoa).then(
          result => {
            this.back();
            this.loading = false;
            Swal.fire({
              type: 'success',
              title: 'Sucesso!',
              text: 'Funcionário salvo com sucesso!'
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
        this.apiService.Post("Pessoas", this.pessoa).then(
          result => {
            this.back();
            this.loading = false;
            Swal.fire({
              type: 'success',
              title: 'Sucesso!',
              text: 'Funcionário salvo com sucesso!'
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

  obterPessoa(pessoa) {
    this.loading = true;
    this.apiService.GetOne("Pessoas", pessoa.uuid).then(
      result => {
        this.pessoa = result;
        this.pessoa.data_nascimento_str = this.global.dateFormater(result['data_nascimento']);
        this.pessoa.admitido_em_str = this.global.dateFormater(result['admitido_em']);
        this.loading = false;
        if (this.pessoa.foto_perfil != null) {
         // this.imgSrc = this.pessoa.foto_perfil_link;
          let img = document.getElementById('imgPessoa');
          img.onerror = function () {
            document.getElementById('imgPessoa').setAttribute('src', '../../../../assets/img/default.jpg');
          }
        } else {
         // this.imgSrc = '../../../../assets/img/default.jpg';
        }
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

  formata_CPF(cpf) {
    return this.global.formataCPF(cpf);
  }

  ///paginação
  obterListaPessoas(indice) {
    this.loading = true;
    var resultado: any;
    //this.apiService.Get("Pessoas?pagina=" + indice).then(
    this.apiService.Get("Pessoas?pagina=" + indice).then(
      result => {
        resultado = result;
        this.listaPessoas = resultado.conteudo;
        this.cabecalho = {
          total_paginas: resultado.total_paginas,
          pagina_atual: resultado.pagina_atual,
          quantidade_pagina: resultado.quantidade_pagina,
          quantidade_total: resultado.quantidade_total
        };
        this.listaPaginas = [];
        for (var i = 1; i <= this.cabecalho.total_paginas; i++) {
          this.listaPaginas.push(i);
        }
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

  primeira() {
    if (this.indice_selecionado != 1) {
      this.indice_selecionado = 1;
      this.obterListaPessoas(this.indice_selecionado);
    }
  }

  anterior() {
    if (this.indice_selecionado != 1) {
      this.indice_selecionado = this.indice_selecionado - 1;
      this.obterListaPessoas(this.indice_selecionado);
    }
  }

  atual(indice) {
    if (this.indice_selecionado != indice) {
      this.indice_selecionado = indice;
      this.obterListaPessoas(this.indice_selecionado);
    } else {
      this.indice_selecionado = indice;
      this.obterListaPessoas(this.indice_selecionado);
    }
  }

  proxima() {
    if (this.indice_selecionado != this.cabecalho.total_paginas) {
      this.indice_selecionado = this.indice_selecionado + 1;
      this.obterListaPessoas(this.indice_selecionado);
    }
  }

  ultima() {
    if (this.indice_selecionado != this.cabecalho.total_paginas) {
      this.indice_selecionado = this.cabecalho.total_paginas;
      this.obterListaPessoas(this.indice_selecionado);
    }
  }

 
  limparCampos() {
    this.indice_selecionado = "";
    this.filtro = {};
  }

  //BUCANDO CEP
  pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        this.endereco.estado_uuid = null;
        this.endereco.cidade_uuid = null;
        this.endereco.bairro = "";
        this.endereco.rua = "";

        this.viaCEP.buscarPorCep(cep).then((endereco: Endereco) => {
          // Endereço retornado :)
          this.meu_callback(endereco);
        }).catch((error: ErroCep) => {
          this.listaCidades = [];
          // Alguma coisa deu errado :/
        });
      }
      else {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'CEP Inválido!'
        });
      }
    }
  }

  meu_callback(conteudo) {

    if (!("erro" in conteudo)) {
      //Atualiza os campos com os valores.
      this.endereco.estado_uuid = this.getIdEstado(conteudo.uf);
      this.obterListaCidades2(this.endereco.estado_uuid, conteudo.localidade);

      this.endereco.bairro = conteudo.bairro;
      this.endereco.rua = conteudo.logradouro;
    }
    else {
      //CEP não Encontrado.
      //this.limpa_formulário_cep();
      //alert("CEP não encontrado.");
    }
  }

  obterListaCidades(estado_id) {
    if (estado_id != null) {
      this.loading = true;
      this.apiService.Get("Estados/" + estado_id + "/Cidades?uuid=" + estado_id).then(
        result => {
          this.listaCidades = result;
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
    else {
      this.endereco.municipio_residencia_id = null;
      this.listaCidades = [];
    }
  }

  obterListaCidades2(estado_id, cidade_nome) {
    if (estado_id != null) {
      this.loading = true;
      this.apiService.Get("Estados/" + estado_id + "/Cidades?uuid=" + estado_id).then(
        result => {
          this.listaCidades = result;
          this.endereco.cidade_uuid = this.getIdCidade(cidade_nome);
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
    else {
      this.endereco.cidade_uuid = null;
      this.listaCidades = [];
    }
  }


  obterListaEstados() {
    this.loading = true;
    this.apiService.Get("Estados").then(
      result => {
        this.listaEstados = result;
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

  getIdEstado(estado_sigla) {
    for (var estado in this.listaEstados) {
      if (this.listaEstados[estado].uf == estado_sigla) {
        return this.listaEstados[estado].id;
      }
    }
  }

  getNomeEstado(estado_uuid) {
    for (var estado in this.listaEstados) {
      if (this.listaEstados[estado].id == estado_uuid) {
        return this.listaEstados[estado].uf;
      }
    }
  }

  getIdCidade(cidade_nome) {
    for (var cidade in this.listaCidades) {
      if (this.listaCidades[cidade].nome.toUpperCase() == cidade_nome.toUpperCase()) {
        return this.listaCidades[cidade].id;
      }
    }
  }

  getNomeCidade(cidade_uuid) {
    for (var cidade in this.listaCidades) {
      if (this.listaCidades[cidade].id == cidade_uuid) {
        return this.listaCidades[cidade].nome.toUpperCase();
      }
    }
  }

}
