import { TestBed, async } from '@angular/core/testing'
import { CoreComponent } from './core.component'

describe('CoreComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoreComponent
      ],
    }).compileComponents()
  }))

  it('should create the core', () => {
    const fixture = TestBed.createComponent(CoreComponent)
    const core = fixture.debugElement.componentInstance
    expect(core).toBeTruthy()
  })

  it(`should have as title 'angular'`, () => {
    const fixture = TestBed.createComponent(CoreComponent)
    const core = fixture.debugElement.componentInstance
    expect(core.title).toEqual('angular')
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(CoreComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('.content span').textContent).toContain('angular app is running!')
  })
})
