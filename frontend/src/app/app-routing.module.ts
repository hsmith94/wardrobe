import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { currentUserCanActivate } from './shared/services/iam-services/current-user.guard';
import { currentUserResolver } from './shared/services/iam-services/current-user.resolver';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { clothesResolver } from './views/wardrobe/clothes.resolver';
import { WardrobeComponent } from './views/wardrobe/wardrobe.component';

export const CLOTHING_ITEM_ID_QUERY_PARAM_KEY: string = 'id';

const routes: Routes = [
    { path: '', redirectTo: 'my-wardrobe', pathMatch: 'full' },
    {
        path: 'my-wardrobe',
        component: WardrobeComponent,
        resolve: {
            currentUser: currentUserResolver,
            clothes: clothesResolver,
        },
        canActivate: [currentUserCanActivate],
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
