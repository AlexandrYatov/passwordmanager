import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import  { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { EditCardComponent } from './components/edit-card/edit-card.component';
import { CardService } from './card.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthguardGuard } from './authguard.guard';
import { UserComponent } from './components/user/user.component';


const appRouters: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cards',
    canActivate: [ AuthguardGuard ],
    component: AddCardComponent
  },
  { path: 'edit-card/:id',
    canActivate: [ AuthguardGuard ],
    component: EditCardComponent
  },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:name',
    canActivate: [ AuthguardGuard ],
    component: UserComponent
  },
  { path: 'user/:name/:id',
    canActivate: [ AuthguardGuard ],
    component: UserComponent
  }
]

@NgModule({
  declarations: [
    [AppComponent],
    NavbarComponent,
    AddCardComponent,
    EditCardComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRouters)
  ],
  providers: [
    CardService,
    LocalStorageService,
    UserService,
    AuthguardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
