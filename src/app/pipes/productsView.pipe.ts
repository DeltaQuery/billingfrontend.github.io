import { Pipe, PipeTransform } from "@angular/core";
//import { resourceLimits } from "worker_threads";

@Pipe({
    name: "productsView"
})
export class productsViewPipe implements PipeTransform{

    transform(text: any) {
        //separa texto de conceptos en un Array con 5 conceptos
    let productsArray = text.split("|");
    let contador = 0;
        //conceptos null o undefined se convierten en "" string vacío, contador++
    for(let i = 0; i < productsArray.length; i++){
        if(productsArray[i] == "null" || productsArray[i] == undefined){
            productsArray[i] = "";
            contador++;
        }
    }
        //si hay +1 concepto, se recortan caracteres de string a max. 20
    if(contador < 4){
        for(let i = 0; i < productsArray.length; i++){
          productsArray[i] = productsArray[i].substring(0,20);
          }  
    }
        //contador == 4 significa que solo hay un concepto, retorna 1 concep.
    if(contador == 4){
        return productsArray[0];
    }
        //retorna 1st Concepto + 2nd Concepto
    if(contador == 3){
        return productsArray[0] + " - " + productsArray[1];
    }
        //etc etc
    if(contador == 2){
        return productsArray[0] + " - " + productsArray[2];
    }
    if(contador == 1){
        return productsArray[0] + " - " + productsArray[3];
    }
    if(contador == 0){
        return productsArray[0] + " - " + productsArray[4];
    }  
    }
}