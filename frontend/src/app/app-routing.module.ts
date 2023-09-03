import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './views/not-found/not-found.component';

const routes: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: '', component: MainComponent },
    // { path: 'wardrobe/', component: WardrobeComponent },
    // { path: 'wardrobe/:itemId', component: ClothingItemComponent },
    { path: '**', component: NotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
