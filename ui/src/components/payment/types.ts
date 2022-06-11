export interface InvoiceData {
    invoice: Invoice;
    order: Order;
};
export interface Invoice {
    createdAt?: string;
    id: string;
    invoiceNumber: string;
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