import { Pipe, PipeTransform } from "@angular/core";
//import { resourceLimits } from "worker_threads";

@Pipe({
    name: "estatusPipe"
})
export class estatusPipe implements PipeTransform{

    transform(estatus: boolean) {
        //separa texto de conceptos en un Array con 5 conceptos
    if(estatus == true){
        return "Activo";
        } else {
        return "Retirado";
        }
    }
}