import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PipesNullfieldsPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pipesNullfields',
})
export class PipesNullfieldsPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, args?:any) {

    if (!value) {
      value = "Sin descripcion"
      
    }
    return value;
  }
}
