export interface InvoiceData {
    data: Invoice;
    merchantAddress: MerchantAddress;
    merchantBank: MerchantBank;
};
export interface Invoice {
    createdAt: string;
    deletedAt?: string;
    id: string;
    invoiceNumber: string;
    package: {
        createdAt: string;
        currency: string;
        deletedAt: null
        description: string;
        id: string;
        name: string;
        price: string;
        title: string;
        type: string;
        updatedAt: string;
        validity: 7;
    }
    packageDescription: string;
    packageId: string;
    packageName: string;
    price: string;
    status: string;
    updatedAt: string;
    user: {
        name: "Bob Sauce"
    }
    userId: string;
}
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