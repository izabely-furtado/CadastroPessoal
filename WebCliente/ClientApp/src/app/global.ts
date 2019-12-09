// global.ts
import { Injectable } from "@angular/core";
import { AppConfig } from "./services/app.config";
import * as moment from "moment";
@Injectable()
export class Global {
  // apiUrl = "https://localhost:5001/api/";
  apiUrl = AppConfig.settings.apiServer.apiUrl;
  currentUser: any = {}

  ///algumas coisas que servem para todas as coisas
  sortByNameAsc(a, b) {
    var nameA = a.toUpperCase(); // ignore upper and lowercase
    var nameB = b.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  }



  formatApiPath(items: any = []) {
    let returnStr = "";
    items.forEach(element => {
      returnStr += element + "/";
    });
    return returnStr.substring(0, returnStr.length - 1);
  }

  apiPaths = {
    Login: "login",
    Endereco: "endereco",
    };

  localeText = {
    page: "Página",
    more: "Mais",
    to: "até",
    of: "de",
    next: "Próximo",
    last: "Último",
    first: "Primeiro",
    previous: "Anterior",
    loadingOoo: "Carregando...",
    selectAll: "Selecione todos",
    searchOoo: "Buscar...",
    blanks: "Em branco",
    filterOoo: "Filtro...",
    applyFilter: "Aplicar filtro...",
    equals: "Igual",
    notEqual: "Diferente",
    lessThanOrEqual: "Menor ou igual a",
    greaterThanOrEqual: "Maior ou igual a",
    operatorAnd: "e",
    operatorOr: "ou",
    notContains: "Não contém",
    inRange: "daInRange",
    lessThan: "Menor que",
    greaterThan: "Maior que",
    contains: "Contém",
    startsWith: "Começa com",
    endsWith: "Termina com",
    group: "Grupo",
    columns: "Colunas",
    groups: "Grupos",
    values: "Valores",
    sum: "Soma",
    min: "Mínimo",
    max: "Máximo",
    count: "Contar",
    average: "Média",
    copy: "Copiar",
    ctrlC: "ctrl C",
    paste: "Colar",
    ctrlV: "ctrl V"
  };

  instituicaoId: any;
  regionalId: any;
  professorId: any;
  alunoId: any;
  usuarioId: any;
  disciplinaId: any;
  barID: any;
  localeItem: any;
  localeItemClient: any;
  estiloId: any;
  token_acesso: any;
  isExpanded: any = true;

  validaData(data) {
    if (this.isValidDate(data)) {
      return true;
    }
    var valido = true;
    data = data + "";
    var dataVetor = data.split("T");
    if (dataVetor.length != 2) {
      return false;
    }
    var dataStrVetor = dataVetor[0].split("-");
    var horaStrVetor = dataVetor[1].split(":");
    if (!(dataStrVetor.length == 3 && horaStrVetor.length == 3 &&
      this.isNumber(dataStrVetor[0]) &&
      this.isNumber(dataStrVetor[1]) &&
      this.isNumber(dataStrVetor[2]) &&
      this.isNumber(horaStrVetor[0]) &&
      this.isNumber(horaStrVetor[1]) &&
      this.isNumber(horaStrVetor[2])
    )) {
      return false;
    }
    return valido;
    //"[1-3][1-3][1-3][1-3]-[1-3][1-3]-[1-3][1-3]T[1-3][1-3]:[1-3][1-3]:[1-3][1-3]";
  }

  isValidDate(d) {
    return !isNaN(d) && d instanceof Date;
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  dateTimeFormater(params) {
    if (params != null) {
      return moment(params).format("DD/MM/YYYY HH:mm:ss");
    } else {
      return "--/--/--";
    }
  }

  dateFormater(params) {
    if (params != null) {
      return moment(params).format("DD/MM/YYYY");
    } else {
      return "--/--/--";
    }
  }


  /* calculando o md5 */

  MD5(d) {
    var result = this.M(this.V(this.Y(this.X(d), 8 * d.length)));
    return result.toLowerCase()
  };

  M(d) {
    for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _);
    return f;
  }

  X(d) {
    for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0;
    for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
    return _;
  }

  V(d) {
    for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
    return _;
  }

  Y(d, _) {
    d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
    for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
      var h = m, t = f, g = r, e = i;
      f = this.md5_ii(f = this.md5_ii(f = this.md5_ii(f = this.md5_ii(f = this.md5_hh(f = this.md5_hh(f = this.md5_hh(f = this.md5_hh(f = this.md5_gg(f = this.md5_gg(f = this.md5_gg(f = this.md5_gg(f = this.md5_ff(f = this.md5_ff(f = this.md5_ff(f = this.md5_ff(f, r = this.md5_ff(r, i = this.md5_ff(i, m = this.md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = this.md5_ff(r, i = this.md5_ff(i, m = this.md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = this.md5_ff(r, i = this.md5_ff(i, m = this.md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = this.md5_ff(r, i = this.md5_ff(i, m = this.md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = this.md5_gg(r, i = this.md5_gg(i, m = this.md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = this.md5_gg(r, i = this.md5_gg(i, m = this.md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = this.md5_gg(r, i = this.md5_gg(i, m = this.md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = this.md5_gg(r, i = this.md5_gg(i, m = this.md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = this.md5_hh(r, i = this.md5_hh(i, m = this.md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = this.md5_hh(r, i = this.md5_hh(i, m = this.md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = this.md5_hh(r, i = this.md5_hh(i, m = this.md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = this.md5_hh(r, i = this.md5_hh(i, m = this.md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = this.md5_ii(r, i = this.md5_ii(i, m = this.md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = this.md5_ii(r, i = this.md5_ii(i, m = this.md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = this.md5_ii(r, i = this.md5_ii(i, m = this.md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = this.md5_ii(r, i = this.md5_ii(i, m = this.md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = this.safe_add(m, h), f = this.safe_add(f, t), r = this.safe_add(r, g), i = this.safe_add(i, e)
    }
    return Array(m, f, r, i)
  };

  md5_cmn(d, _, m, f, r, i) {
    return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(_, d), this.safe_add(f, i)), r), m)
  };

  md5_ff(d, _, m, f, r, i, n) {
    return this.md5_cmn(_ & m | ~_ & f, d, _, r, i, n)
  };

  md5_gg(d, _, m, f, r, i, n) {
    return this.md5_cmn(_ & f | m & ~f, d, _, r, i, n)
  };

  md5_hh(d, _, m, f, r, i, n) {
    return this.md5_cmn(_ ^ m ^ f, d, _, r, i, n)
  };

  md5_ii(d, _, m, f, r, i, n) {
    return this.md5_cmn(m ^ (_ | ~f), d, _, r, i, n)
  };

  safe_add(d, _) {
    var m = (65535 & d) + (65535 & _);
    return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m
  };

  bit_rol(d, _) {
    return d << _ | d >>> 32 - _
  };

  /* necessário para o md5 */
  /** NORMAL words**/
  md5Normal(valor) {
    //value = 'test';
    var result = this.MD5(valor);
    //document.body.innerHTML = 'hash -  normal words: ' + result;
    return result;
    // value = 'מבחן'
  }


  /** NON ENGLISH words**/
  md5English(value) {
    //unescape() can be deprecated for the new browser versions
    //var result = this.MD5(unescape(encodeURIComponent(value)));
    //document.body.innerHTML += '<br><br>hash - non english words: ' + result;
    //return result;
  }

  /* fim das variaveis para md5 */




  validaHorario(horario) {
    var vetorHorario = horario.split(":");
    if (vetorHorario.length < 2) {
      return false;
    }
    else {
      var hora = parseInt(vetorHorario[0]);
      var min = parseInt(vetorHorario[1]);
      var segundo = 0;
      if (vetorHorario.lenght == 3) {
        segundo = parseInt(vetorHorario[2]);
      }
      if (hora > 23 || hora < 0) {
        return false;
      }
      if (min > 59 || min < 0) {
        return false;
      }
      if (segundo > 59 || segundo < 0) {
        return false;
      }
      return true;
    }

  }

  addHora(horario_1, horario_2) {
    var horario_1_vetor = horario_1.split(":");
    var hora_1 = parseInt(horario_1_vetor[0]);
    var minu_1 = parseInt(horario_1_vetor[1]);

    if (horario_1.includes("-")) {
      hora_1 = - Math.abs(hora_1);
      minu_1 = - Math.abs(minu_1);
    }

    var horario_2_vetor = horario_2.split(":");
    var hora_2 = parseInt(horario_2_vetor[0]);
    var minu_2 = parseInt(horario_2_vetor[1]);

    if (horario_2.includes("-")) {
      hora_2 = - Math.abs(hora_2);
      minu_2 = - Math.abs(minu_2);
    }

    var minuto = minu_1 + minu_2;
    var hora = 0;
    if (minuto >= 60) {
      hora += 1;
      minuto = minuto - 60;
    }

    if (minuto <= -60) {
      hora -= 1;
      minuto = minuto + 60;
    }

    hora += hora_1 + hora_2;

    var hora_ = "";
    if (hora < 0 || (hora == 0 && minuto < 0)) {
      hora_ += "-";
    }
    hora = Math.abs(hora);

    if (hora <= 9) {
      hora_ += "0" + hora;
    }
    else {
      hora_ += "" + hora;
    }

    minuto = Math.abs(minuto);

    if (minuto <= 9) {
      var minuto_ = "0" + minuto;
    }
    else {
      minuto_ = "" + minuto;
    }

    return hora_ + ":" + minuto_;
  }

  minusHora(horario_1, horario_2) {
    var horario_1_vetor = horario_1.split(":");
    var hora_1 = parseInt(horario_1_vetor[0]);
    var minu_1 = parseInt(horario_1_vetor[1]);

    if (horario_1.includes("-")) {
      hora_1 = - hora_1;
      minu_1 = - minu_1;
    }

    var horario_2_vetor = horario_2.split(":");
    var hora_2 = parseInt(horario_2_vetor[0]);
    var minu_2 = parseInt(horario_2_vetor[1]);

    if (horario_2.includes("-")) {
      hora_2 = - hora_2;
      minu_2 = - minu_2;
    }

    var minuto = minu_1 + minu_2;
    if (minuto < 0) {
      hora_1 -= 1;
      minuto = 60 - Math.abs(minuto);
    }

    var hora = hora_1 - hora_2;

    var hora_ = "";
    if (hora < 0 || (hora == 0 && minuto < 0)) {
      hora_ += "-";
    }
    hora = Math.abs(hora);

    if (hora < 0) {
      hora_ += hora;
    }
    else if (hora <= 9 && hora >= 0) {
      hora_ += "0" + hora;
    }
    else {
      hora_ += "" + hora;
    }

    minuto = Math.abs(minuto);
    if (minuto <= 9) {
      var minuto_ = "0" + minuto;
    }
    else {
      minuto_ = "" + minuto;
    }

    return hora_ + ":" + minuto_;
  }

  formataCPF(cpf) {
    return cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9, 11);
  }

}
