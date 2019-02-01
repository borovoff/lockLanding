import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LockComponent} from './lock/lock.component';
import {MainComponent} from './main/main.component';
import {ContactComponent} from './contact/contact.component';
import {OrderComponent} from './order/order.component';
import {DownloadsComponent} from './downloads/downloads.component';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'blog', component: MainComponent,
        resolve: {url: 'externalUrlRedirectResolver'},
        data: {externalUrl: 'https://medium.com/tzar'}
    },
    { path: 'lock', component: LockComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'order', component: OrderComponent },
    { path: 'downloads', component: DownloadsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
