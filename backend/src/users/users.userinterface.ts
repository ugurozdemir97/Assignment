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
