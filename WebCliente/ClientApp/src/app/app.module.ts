import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FilterPipeModule } from 'ngx-filter-pipe';

//import { AppConfig } from './services/app.config';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';


//import { ApiService } from './services/api.service';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgAutoCompleteModule } from "ng-auto-complete";
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS } from "ng-pick-datetime";
import { NgxMaskModule, IConfig } from 'ngx-mask'
//import { MatFormComponentsModule } from 'ngx-mat-form-components';

//imports
import { appRoutes } from './routes';

//components
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

//pages
import { HomeComponent } from './pages/home/home.component';
import { Global } from './global';
import { ApiService } from './services/api.service';
import { AppConfig } from './services/app.config';

//modal
import { ModalCadSetorComponent } from './components/modal-cad-setor/modal-cad-setor.component';
import { ModalAcompanhamentoComponent } from './components/modal-acompanhamento/modal-acompanhamento.component';
import { PessoaComponent } from './pages/cadastros/pessoa/pessoa.component';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

export const MY_MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'l LT',
  datePickerInput: 'l',
  timePickerInput: 'LT Z ZZ',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TopBarComponent,
    ModalCadSetorComponent,
    PessoaComponent,
    ModalAcompanhamentoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.rectangleBounce,
      backdropBackgroundColour: "rgba(0,0,0,0.1)",
      backdropBorderRadius: "4px",
      primaryColour: "#0dcf61",
      secondaryColour: "#b1ff00",
      tertiaryColour: "#0dcf61"
    }),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    //MatFormComponentsModule,
    NgxViacepModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NgAutoCompleteModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FilterPipeModule
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true
    },
    Global,
    ApiService,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pt' },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS },
  ],
  entryComponents:[
    ModalCadSetorComponent,
    ModalAcompanhamentoComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
