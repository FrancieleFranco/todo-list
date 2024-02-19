import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestFontWeigthResizerDirectiveComponent } from './fontWeightResizerDirective.component';
import { FontWeightResizerDirective } from '../../fontWeightResizer.directive';

describe('TestFontWeigthResizerDirective', () => {
  let fixture: ComponentFixture<TestFontWeigthResizerDirectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestFontWeigthResizerDirectiveComponent,
        FontWeightResizerDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(TestFontWeigthResizerDirectiveComponent);
    fixture.detectChanges();
  });

  it('should font-weight to be bold', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const fontWeigth = h2.style.fontWeight;
    expect(fontWeigth).toEqual('bold');
  });
});
