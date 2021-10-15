import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'domSecure'
})
export class DomSecurePipe implements PipeTransform {

  constructor(private domSatinizer: DomSanitizer) {}

  transform(uri: string, url: string): SafeResourceUrl {
    return this.domSatinizer.bypassSecurityTrustResourceUrl(`${url}${uri}`)
  };

}
