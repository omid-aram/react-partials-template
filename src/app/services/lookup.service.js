
import baseService from './base.service'


export function getPaginated(filter) {
  return baseService.post("/lookup/GetPaginated", {});
}

export function getItems(filter) {
  return baseService.post("/AuctionResponse/GetItems", filter);
}

