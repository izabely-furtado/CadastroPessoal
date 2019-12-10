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
  carga_horaria: any = null;
  loading = false;
  visualizando: any = false;
  listaPessoas: any = [];
  listaTiposBusca: any = [];
  listaEstados: any = [];
  listaCidades: any = [];
  tipoBusca: any = { id: 0 };
  //imgSrc: any = '../../../../assets/img/default.jpg';
  pesquisa: any = { unidade: 0, cargo: 0, vinculo: 0 };
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
    //this.obterListaEstados();
    //this.atual(1, {});
    //this.obterTiposBusca();

  }


  obterTiposBusca() {
    this.listaTiposBusca = [
      { id: 1, nome: 'CPF' },
      { id: 2, nome: 'Nome' },
      //pesquisar por data d aniversároo?

    ];
  }

  getFormatterDate(item) {
    return this.global.dateFormater(item);
  }

  add() {
    this.novaPessoa = true;
    this.pessoa = {};
    this.endereco = {};
    this.carga_horaria = null;
    this.pessoa.ativo = true;
  }

  back() {
    this.atual(1, {});
    //this.obterPessoas();
    this.novaPessoa = false;
    //this.imgSrc = '../../../../assets/img/default.jpg';
    this.pessoa = {};
    this.endereco = {};
    this.carga_horaria = null;
  }

  addSetor(unidade, setor) {
    if (unidade == null) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira o unidade!'
      });
      return;
    }
    if (setor == null) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira o setor!'
      });
      return;
    }

    if (this.pessoa.setores == null) {
      this.pessoa.setores = [];
    }
    this.pessoa.setores.push({
      unidade_uuid: unidade.uuid,
      unidade_nome: unidade.nome,
      setor_uuid: setor.uuid,
      setor_nome: setor.nome,
      ativo: setor.ativo
    });
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
    if (endereco.endereco_rua == null || endereco.endereco_rua == "") {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira a rua!'
      });
      return;
    }
    if (endereco.endereco_numero == null || endereco.endereco_numero <= 0) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira o numero!'
      });
      return;
    }
    if (endereco.endereco_bairro == null || endereco.endereco_bairro == "") {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira o bairro!'
      });
      return;
    }
    //if (unidade.endereco_complemento == null || unidade.endereco_complemento == "") {
    //  Swal.fire({
    //    type: 'error',
    //    title: 'Oops...',
    //    text: 'Insira o complemento!'
    //  });
    //  return false;
    //}
    if (endereco.municipio_uuid == null) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Insira o municipio!'
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
    endereco.endereco_estado = this.getNomeEstado(endereco.estado_uuid);
    endereco.endereco_cidade = this.getNomeCidade(endereco.municipio_uuid);
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
    
    if ((pessoa.telefone1_ddd != null && pessoa.telefone1_ddd != "") && (pessoa.telefone1_ddd < 10 || pessoa.telefone1_ddd > 99)) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'DDD Inválido do telefone!'
      });
      return false;
    }
    //if (pessoa.telefone1_numero == null || pessoa.telefone1_numero <= 0) {
    //  Swal.fire({
    //    type: 'error',
    //    title: 'Oops...',
    //    text: 'Insira o telefone!'
    //  });
    //  return false;
    //}
    
  }

  edit(pessoa) {
    this.novaPessoa = true;
    this.obterPessoa(pessoa);
    this.obterListaCidades2(pessoa.estado_uuid, pessoa.municipio_nome);
    //this.pessoa = pessoa;
    this.visualizando = false;

  }

  view(pessoa) {
    this.edit(pessoa);
    this.visualizando = true;
  }

  obterPessoas() {

    this.listaPessoas = [];





    //this.loading = true;
    //this.apiService.Get("Pessoas").then(
    //  result => {
    //    this.listaPessoas = result;
    //    this.loading = false;
    //  },
    //  err => {
    //    this.loading = false;
    //    Swal.fire({
    //      type: 'error',
    //      title: 'Oops...',
    //      text: err.error.mensagem
    //    });
    //  }
    //);

  }

  
  submit() {
    if (this.valida(this.pessoa)) {
      this.pessoa.endereco_cep = this.pessoa.endereco_cep.replace(/\D/g, '');
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

  desativar(pessoa) {
    this.loading = true;
    this.apiService.desativar("Pessoas", pessoa.uuid)
      .then(
        result => {
          this.loading = false;
          this.atual(1, {});
          //this.obterPessoas();
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

  ativar(pessoa) {
    this.loading = true;
    this.apiService.ativar("Pessoas", pessoa.uuid)
      .then(
        result => {
          this.loading = false;
          this.atual(1, {});
          //this.obterPessoas();
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
  obterListaPessoas(indice, pesquisa) {
    let nomePesquisa = '';

    if (pesquisa == null) {
      pesquisa = {};
    }
    if (this.tipoBusca.id == 1 && (pesquisa.nome_pesquisa != "" && pesquisa.nome_pesquisa != null)) {
      nomePesquisa = pesquisa.nome_pesquisa;
    }

    if (this.tipoBusca.id == 2 && (pesquisa.nome_pesquisa != "" && pesquisa.nome_pesquisa != null)) {
      nomePesquisa = pesquisa.nome_pesquisa;
    }
    if (this.tipoBusca.id == 3 && (pesquisa.nome_pesquisa != "" && pesquisa.nome_pesquisa != null)) {
      nomePesquisa = pesquisa.nome_pesquisa;
    }
    if (this.tipoBusca.id == 4 && (pesquisa.nome_pesquisa != "" && pesquisa.nome_pesquisa != null)) {
      let dia = pesquisa.nome_pesquisa.substring(0, 2);
      let mes = pesquisa.nome_pesquisa.substring(2, 4);
      let ano = pesquisa.nome_pesquisa.substring(4, 8);
      nomePesquisa = ano + "-" + mes + "-" + dia;
    }

    this.loading = true;
    var resultado: any;
    //this.apiService.Get("Pessoas?pagina=" + indice).then(
    this.apiService.Get("Pessoas?ativo=" + "" + "&pagina=" + indice + "&query=" + nomePesquisa + "&unidade=" + pesquisa.unidade + "&setor=" + pesquisa.setor + "&cargo=" + pesquisa.cargo + "&vinculo=" + pesquisa.vinculo).then(
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

  primeira(pesquisa) {
    if (this.indice_selecionado != 1) {
      this.indice_selecionado = 1;
      this.obterListaPessoas(this.indice_selecionado, pesquisa);
    }
  }

  anterior(pesquisa) {
    if (this.indice_selecionado != 1) {
      this.indice_selecionado = this.indice_selecionado - 1;
      this.obterListaPessoas(this.indice_selecionado, pesquisa);
    }
  }

  atual(indice, pesquisa) {
    if (this.indice_selecionado != indice) {
      this.indice_selecionado = indice;
      this.obterListaPessoas(this.indice_selecionado, pesquisa);
    } else {
      this.indice_selecionado = indice;
      this.obterListaPessoas(this.indice_selecionado, pesquisa);
    }
  }

  proxima(pesquisa) {
    if (this.indice_selecionado != this.cabecalho.total_paginas) {
      this.indice_selecionado = this.indice_selecionado + 1;
      this.obterListaPessoas(this.indice_selecionado, pesquisa);
    }
  }

  ultima(pesquisa) {
    if (this.indice_selecionado != this.cabecalho.total_paginas) {
      this.indice_selecionado = this.cabecalho.total_paginas;
      this.obterListaPessoas(this.indice_selecionado, pesquisa);
    }
  }

  mudarTipoPesquisa() {
    this.pesquisa.nome_pesquisa = "";
  }

  limparCampos(pesquisa, tipoBusca) {
    this.indice_selecionado = "";
    this.pesquisa.nome_pesquisa = "";
    this.pesquisa.unidade = "";
    this.tipoBusca.id = 0;
    //this.listaSetores = null;
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
        this.endereco.municipio_uuid = null;
        this.endereco.endereco_bairro = "";
        this.endereco.endereco_rua = "";

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

      this.endereco.endereco_bairro = conteudo.bairro;
      this.endereco.endereco_rua = conteudo.logradouro;
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
      this.apiService.Get("Estados/" + estado_id + "/Municipios").then(
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
      this.apiService.Get("Estados/" + estado_id + "/Municipios").then(
        result => {
          this.listaCidades = result;
          this.endereco.municipio_uuid = this.getIdCidade(cidade_nome);
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
      this.endereco.municipio_uuid = null;
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
      if (this.listaEstados[estado].sigla == estado_sigla) {
        return this.listaEstados[estado].uuid;
      }
    }
  }

  getNomeEstado(estado_uuid) {
    for (var estado in this.listaEstados) {
      if (this.listaEstados[estado].uuid == estado_uuid) {
        return this.listaEstados[estado].sigla;
      }
    }
  }

  getIdCidade(cidade_nome) {
    for (var cidade in this.listaCidades) {
      if (this.listaCidades[cidade].nome == cidade_nome.toUpperCase()) {
        return this.listaCidades[cidade].uuid;
      }
    }
  }

  getNomeCidade(cidade_uuid) {
    for (var cidade in this.listaCidades) {
      if (this.listaCidades[cidade].uuid == cidade_uuid) {
        return this.listaCidades[cidade].nome.toUpperCase();
      }
    }
  }

}
