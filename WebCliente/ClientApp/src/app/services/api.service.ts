import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from "../global";
import { Router } from "@angular/router";
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

@Injectable()
export class ApiService {
  currentUser: any;
  headerOptions: any;
  headers = new Headers();
  constructor(
    private http: HttpClient,
    public global: Global,
    public router: Router,
    private http_: Http
  ) {

  }

  Get(path) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.global.apiUrl + path, {
          headers: new HttpHeaders()
            .set("Content-Type", "application/json")
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  GetOne(path, id) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.global.apiUrl + this.global.formatApiPath([path, id]), {
          headers: new HttpHeaders()
            .set("Content-Type", "application/json")
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  Post(path, data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.global.apiUrl + path, JSON.stringify(data), {
          headers: new HttpHeaders()
            .set("Content-Type", "application/json")
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  
  Put(path, data) {
    return new Promise((resolve, reject) => {
      this.http
        .put(
          this.global.apiUrl + this.global.formatApiPath([path, data.uuid]),
          JSON.stringify(data),
          {
            headers: new HttpHeaders()
              .set("Content-Type", "application/json")
          }
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  PutCliente(path, data) {
    return new Promise((resolve, reject) => {
      this.http
        .put(
          this.global.apiUrl + path, JSON.stringify(data),
          {
            headers: new HttpHeaders()
              .set("Content-Type", "application/json")
          }
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  Put2(path, data) {
    return new Promise((resolve, reject) => {
      this.http
        .put(
          this.global.apiUrl + this.global.formatApiPath([path, "id?id=" + data.uuid]),
          JSON.stringify(data),
          {
            headers: new HttpHeaders()
              .set("Content-Type", "application/json")
          }
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  Delete(path, id) {
    return new Promise((resolve, reject) => {
      this.http
        .delete(this.global.apiUrl + this.global.formatApiPath([path, id]), {
          headers: new HttpHeaders()
            .set("Content-Type", "application/json")
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }


  DelereEscala(path, data) {
    return new Promise((resolve, reject) => {
      this.http
        .patch(
          this.global.apiUrl + path,
          data,
          {
            headers: new HttpHeaders()
              .set("Content-Type", "application/json")
              .set("Access-Control-Allow-Origin", "*")
          }
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  DeleteArray(path, lista) {
    var para_deletar = "?";
    for (var i = 0; i < lista.length; i++) {
      para_deletar += "escalas=" + lista[i] + "&";
    }
    return new Promise((resolve, reject) => {
      this.http
        .delete(this.global.apiUrl + this.global.formatApiPath([path + para_deletar]), {
          headers: new HttpHeaders()
            .set("Content-Type", "application/json")
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  ativar(path, id) {
    return new Promise((resolve, reject) => {
      this.http
        .patch(
          this.global.apiUrl + path + "/" + id + "?ativo=true",
          {},
          {
            headers: new HttpHeaders()
              .set("Content-Type", "application/json")
              .set("Access-Control-Allow-Origin", "*")
          }
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  ativar2(path, id) {
    return new Promise((resolve, reject) => {
      this.http
        .patch(
          this.global.apiUrl + path + "/id?id=" + id + "&ativo=true",
          {},
          {
            headers: new HttpHeaders()
              .set("Content-Type", "application/json")
              .set("Access-Control-Allow-Origin", "*")
          }
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  desativar(path, id) {
    return new Promise((resolve, reject) => {
      this.http
        .patch(
          this.global.apiUrl + path + "/" + id + "?ativo=false",
          {},
          {
            headers: new HttpHeaders()
              .set("Content-Type", "application/json")
              .set("Access-Control-Allow-Origin", "*")
          }
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  desativar2(path, id) {
    return new Promise((resolve, reject) => {
      this.http
        .patch(
          this.global.apiUrl + path + "/id?id=" + id + "&ativo=false",
          {},
          {
            headers: new HttpHeaders()
              .set("Content-Type", "application/json")
              .set("Access-Control-Allow-Origin", "*")
          }
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  Patch(path, id, status) {
    return new Promise((resolve, reject) => {
      this.http
        .patch(
          this.global.apiUrl + path + "/" + id + "?status=" + status,
          {},
          {
            headers: new HttpHeaders()
              .set("Content-Type", "application/json")
          }
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  Patch_body(path, dado) {
    return new Promise((resolve, reject) => {
      this.http
        .patch(
          this.global.apiUrl + path,
          dado,
          {
            headers: new HttpHeaders()
              .set("Content-Type", "application/json")
          }
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  mudarSenha(path, id, senha_antiga, senha_nova) {
    return new Promise((resolve, reject) => {
      this.http
        .patch(
          this.global.apiUrl + path + "/" + id + "?" + "senhaNova=" + senha_nova + "&senhaAntiga=" + senha_antiga,
          {},
          {
            headers: new HttpHeaders()
              .set("Content-Type", "application/json")
              .set("Access-Control-Allow-Origin", "*")
          }
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  //buscando localização
  getEstados() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.global.apiUrl + "Estados", {
          headers: new HttpHeaders()
            .set("Content-Type", "application/json")
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }


  getCidades(estado_id) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.global.apiUrl + "Estados/" + estado_id + "/Municipios", {
          headers: new HttpHeaders()
            .set("Content-Type", "application/json")
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getBairros(municipio_id) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.global.apiUrl + "Municipios/" + municipio_id + "/Bairro", {
          headers: new HttpHeaders()
            .set("Content-Type", "application/json")
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }


  getCidadesId(estado_id) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.global.apiUrl + "Estados/" + estado_id + "/Cidades", {
          headers: new HttpHeaders()
            .set("Content-Type", "application/json")
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }


  buscarAutoComplete(path) {
    return this.http_.get(`${this.global.apiUrl}${path}`, { headers: this.headers }
    ).map(res => {
      return res.json().map(item => {
        return item
      })
    })
  }

}
