import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { EventModalComponent } from './event-modal/event-modal.component';
import { NewPostModalComponent } from './new-post-modal/new-post-modal.component';
import { FormsModule } from '@angular/forms';
import { ModalConversationComponent } from './modal-conversation/modal-conversation.component';
import { GroupsService } from './services/groups.service';
import { EventsService } from './services/events.service';
import { AddEventModalComponent } from './add-event-modal/add-event-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    EventModalComponent,
    NewPostModalComponent,
    ModalConversationComponent,
    AddEventModalComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GroupsService,
    EventsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
