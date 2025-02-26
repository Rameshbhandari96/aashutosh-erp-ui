import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterCapitalize',
  standalone: true
})
export class FirstLetterCapitalizePipe implements PipeTransform {

  transform(value: string): string {
   if(!value) return value;
   const newVal= value 
   .split(' ')
   .map(word=> word.charAt(0).toUpperCase() + word.slice(1))
   .join();
   return newVal;
  }

}
