import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GptInterfaceComponent } from './gpt-interface-component.component';

describe('GptInterfaceComponentComponent', () => {
  let component: GptInterfaceComponent;
  let fixture: ComponentFixture<GptInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GptInterfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GptInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
