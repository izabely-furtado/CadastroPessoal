import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PessoaComponent } from './pages/cadastros/pessoa/pessoa.component';

export const appRoutes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: 'cadastros', children: [
          { path: 'pessoa', component: PessoaComponent },
        ]
      },
    ]
  },
  // { path: 'erro', component: ErroComponent, pathMatch: 'full' },
];
