export interface PageCategory {
    createdAt?: string;
    deletedAt?: string;
    description: string;
    id: string;
    pages: Page[];
    title: string;
    updatedAt: string;
}
export interface Page {
    PageCategoryId: string;
    content: string;
    description: string;
    id: string;
    pageCategoryId: string;
    slug: string;
    title: string;
}