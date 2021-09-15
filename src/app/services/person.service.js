
import baseService from './base.service'




export function getPerson(id){
    return baseService.post("/Person/GetPersonDetail", {id});
  }