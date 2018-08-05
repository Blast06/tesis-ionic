import { Http } from '@angular/http';
import { URL_ARTICLE_ISFAVORITED } from './../URLs/url.servicios';
import { Pipe,PipeTransform } from "@angular/core";

@Pipe({
    name:'isFavorited'
})

export class IsFavoritePipe implements PipeTransform{
    transform(value:string, args:string[]):any{
        

    }

}