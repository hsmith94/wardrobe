import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainToolbarComponent } from './main-toolbar.component';

describe('MainToolbarComponent', () => {
    let component: MainToolbarComponent;
    let fixture: ComponentFixture<MainToolbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MainToolbarComponent],
            imports: [MatToolbarModule, MatButtonModule, MatIconModule],
        });
        fixture = TestBed.createComponent(MainToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
