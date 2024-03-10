import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../../pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'community',
        loadChildren: () =>
          import('../../pages/community/community.module').then(
            (m) => m.CommunityPageModule
          ),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('../../pages/events/events.module').then(
            (m) => m.EventsPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../../pages/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'tools',
        loadChildren: () =>
          import('../../pages/tools/tools.module').then(
            (m) => m.ToolsPageModule
          ),
      },
    ],
  },
  // {
  //   path: '',
  //   redirectTo: '/events',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
