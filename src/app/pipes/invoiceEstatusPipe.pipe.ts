import { Pipe, PipeTransform } from "@angular/core";
//import { resourceLimits } from "worker_threads";

@Pipe({
    name: "invoiceEstatusPipe"
})
export class invoiceEstatusPipe implements PipeTransform{

    transform(estatus: number) {
        //separa texto de conceptos en un Array con 5 conceptos
    if(estatus == 1){
        return "Vigente";
        } else {
        return "Anulada";
        } 
    }
}