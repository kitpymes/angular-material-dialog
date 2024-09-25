import { TestBed, waitForAsync } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { SafeHtmlPipe } from './dialog-sanitizer-html.pipe';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        SafeHtmlPipe,
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: (val: string) => val,
          }
        }
      ]
    }).compileComponents().then(() => {
      pipe = TestBed.inject(SafeHtmlPipe);
    });
  }));

  it('transform html', () => {
    const html = `<iframe class="w-100" src="https://www.youtube.com/embed/KS76EghdCcY?rel=0&amp;controls=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    const result = pipe.transform(html);

    expect(result).toEqual(html);
  });
});
