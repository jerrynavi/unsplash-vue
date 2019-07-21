export interface IPhoto {
    id: string;
    created_at: string;
    width: number;
    height: number;
    description: string;
    user: {
        id: string;
        username: string;
        name: string;
        location: string;
    };
    urls: {
        full: string;
        regular: string;
    };
}
