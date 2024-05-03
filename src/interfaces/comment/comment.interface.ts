export interface Comments {
    id: number;
    description: string;
}

export interface CommentRequest {
    type_id: number;
    title: string;
    description: string;
}