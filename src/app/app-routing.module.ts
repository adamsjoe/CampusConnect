import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  // },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('../pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('../pages/profile/profile.module').then(
        (m) => m.ProfilePageModule
      ),
  },
  {
    path: 'community',
    loadChildren: () =>
      import('../pages/community/community.module').then(
        (m) => m.CommunityPageModule
      ),
  },
  {
    path: 'tools',
    loadChildren: () =>
      import('../pages/tools/tools.module').then((m) => m.ToolsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../pages/login/login.module').then((m) => m.LoginPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
