import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClothingItemComponent } from './views/clothing-item/clothing-item.component';
import { clothingItemResolver } from './views/clothing-item/clothing-item.resolver';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { WardrobeComponent } from './views/wardrobe/wardrobe.component';

export const CLOTHING_ITEM_ID_QUERY_PARAM_KEY: string = 'id';

const routes: Routes = [
    { path: '', redirectTo: 'my-wardrobe', pathMatch: 'full' },
    {
        path: 'my-wardrobe',
        component: WardrobeComponent,
        children: [
            {
                path: 'look-at',
                component: ClothingItemComponent,
                resolve: {
                    item: clothingItemResolver,
                },
            },
        ],
    },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
