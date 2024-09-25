import { Pipe, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Esta pipe sirve para transformar código html de tipo string en html puro.
 *
 * @example
 * <div>{{ [innerHTML]="data | sanitizerHtml" }}</div>
*/
@Pipe({ name: "sanitizerHtml", standalone: true })
export class SafeHtmlPipe {
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  transform = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
}
