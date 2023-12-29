import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Web3ApiComponent } from './web3-api.component';

describe('Web3ApiComponent', () => {
  let component: Web3ApiComponent;
  let fixture: ComponentFixture<Web3ApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Web3ApiComponent]
    });
    fixture = TestBed.createComponent(Web3ApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
