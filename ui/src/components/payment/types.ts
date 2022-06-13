export interface InvoiceData {
    invoice: Invoice;
    MerchantBank: MerchantBank;
    MerchantAddress: MerchantAddress;
};
export interface Invoice {
    createdAt?: string;
    deletedAt?: string;
    id: string;
    invoiceNumber: string;
    order: Order;
    orderId: string;
    updatedAt: string;
};
export interface Order {
    createdAt?: string;
    currency: string;
    date: string;
    id: string;
    itemName: string;
    qty: string;
    unitPrice: string;
    updatedAt: string;
    userId: string;
};
export interface MerchantBank {
    acct_name: string;
    acct_number: string;
    acct_sort_code: string;
    bank: string;
    createdAt: string;
    deletedAt?: string;
    id: string;
    updatedAt: string;
}
export interface MerchantAddress {
    address_line_1: string;
    address_line_2: string;
    city: string;
    country: string;
    createdAt: string;
    deletedAt?: string;
    id: string;
    postal_code: string;
    state: string;
    updatedAt: string;
}