export interface User {
    id: number;
    isAdmin: boolean;
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface UpdatedUser {
    id: number;
    isAdmin: boolean;
    name: string;
    username: string;
}

export interface UpdatedPost {
    id: number;
    userId: number;
    title: string;
    postContext: string;
}
