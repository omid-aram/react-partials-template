
import baseService from './base.service'



export function getAuction(id){
  return baseService.post("/Auction/Get", {id});
}

export function loadAuctionItems(auctionId, batchNo){
  return baseService.post("/AuctionItem/loadItems", {auctionId, batchNo});
}


export function getItems(filter) {
  return baseService.post("/Auction/GetItems", filter);
}

export function addImageToItem(data) {
  return baseService.post("/AuctionItem/AddImage", data);
}

export function removeImagefromItem(data) {
  return baseService.post("/AuctionItem/RemoveImage", data);
}

export function updateItemCar(data) {
  return baseService.post("/AuctionItem/UpdateCar", data);
}


export function getAllAvailable() {
  return baseService.post("/AuctionResponse/GetAllAvailable", {});
}

export function findWinner(auctionId) {
  return baseService.post("/Auction/FindWinner", {id: auctionId});
}

export function FinalizeEdit(auctionId) {
  return baseService.post("/Auction/FinalizeEdit", {id: auctionId});
}

export function getCustomerItemsInAuction(auctionId, personId) {
  return baseService.post("/AuctionResponse/GetCustomerItemsInAuction", {auctionId, personId});
}
export function getCustomerPaymentsInAuction(auctionId, personId) {
  return baseService.post("/AuctionResponse/GetCustomerPaymentsInAuction", {auctionId, personId});
}

export function getCustomerVouchersInAuction(auctionId, personId) {
  return baseService.post("/AuctionResponse/GetCustomerVouchersInAuction", {auctionId, personId});
}


export function getCustomerConfirmedItemsInAuction(auctionId, personId) {
  return baseService.post("/AuctionInvoice/GetConfirmedItemsForCustomer", {auctionId, personId});
}

export function getInvoicesForCustomer(auctionId, personId) {
  return baseService.post("/AuctionInvoice/GetInvoicesForCustomer", {auctionId, personId});
}

export function createAucInvoice( itemIds) {
  return baseService.post("/AuctionInvoice/CreateInvoice", itemIds);
}

export function getAucInvoiceItems(invoiceId){
  return baseService.post("/AuctionInvoice/GetInvoiceItems", {invoiceId});
}

export function updateAucInvoiceItems(items){
  return baseService.post("/AuctionInvoice/UpdateInvoiceItems", items);
}
export function cancelAuctionInvoice(invoice){
  return baseService.post("/AuctionInvoice/CancelInvoice", invoice);
}
export function deleteAuctionInvoices(ids){
  return baseService.post("/AuctionInvoice/DeleteInvoices", ids);
}
export function numberAuctionInvoices(ids){
  return baseService.post("/AuctionInvoice/setNumber", ids);
}

export function confirmAuctionPayment(confirmation) {
  return baseService.post("/AuctionDraft/ConfirmPayment", confirmation);
}


export function securityConfirmResItem(aucResItemId){
  return baseService.post("/AuctionResponse/SecurityConfirmItem", {id:aucResItemId});
}

export function getAuctionStats(auctionId){
  return baseService.post("/Auctionreport/GetStats", {id:auctionId});
}

export function getAuctionItemsStats(auctionId){
  return baseService.post("/Auctionreport/GetitemsStats", {id:auctionId});
}