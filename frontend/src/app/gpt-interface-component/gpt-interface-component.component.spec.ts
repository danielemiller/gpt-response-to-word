import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GptInterfaceComponentComponent } from './gpt-interface-component.component';

describe('GptInterfaceComponentComponent', () => {
  let component: GptInterfaceComponentComponent;
  let fixture: ComponentFixture<GptInterfaceComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GptInterfaceComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GptInterfaceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
