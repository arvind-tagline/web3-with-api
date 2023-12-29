import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Web3ApiComponent } from './components/web3-api/web3-api.component';

const routes: Routes = [
  {
    path: '',
    component: Web3ApiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
