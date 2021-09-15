
import baseService from './base.service'


export function getEnumSelectData(enumType) {
  return baseService.post("/Common/GetEnumSelectData", { enumType });
}

export function getLookupSelectData(lookupType) {
  return baseService.post("/Lookup/GetLookupSelectData", { lookupType });
}


export function getSelectDataWithUrl(url) {
  return baseService.post(url, {});
}

export function getSelectDataWithId(url, id) {

  return baseService.post(url, { Id: id });
}
