export interface Banner {
    action: string;
    action_label: string;
    action_type: string;
    createdAt: string;
    deletedAt: string;
    description: string;
    id: string;
    media: Media;
    mediaId: string;
    title: string;
    updatedAt: string;
}

export interface Media {
    extension: string;
    id: string;
    mime: string;
    url: string;
}