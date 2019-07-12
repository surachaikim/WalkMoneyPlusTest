import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'loginpin', loadChildren: './loginpin/loginpin.module#LoginpinPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'paydebt', loadChildren: './paydebt/paydebt.module#PaydebtPageModule' },
  { path: 'confirm', loadChildren: './confirm/confirm.module#ConfirmPageModule' },
  { path: 'receipt', loadChildren: './receipt/receipt.module#ReceiptPageModule' },
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
