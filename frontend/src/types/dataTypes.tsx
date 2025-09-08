import type { Dispatch, SetStateAction } from "react";

export type UserProp = {
    id: number;
    isAdmin: boolean;
    name: string;
    username: string;
};

export type LoginProp = {
    setView: Dispatch<SetStateAction<string>>;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    setCurrentUser: Dispatch<SetStateAction<{ id: number; isAdmin: boolean }>>;
};

export type PostProp = {
    id: number;
    userId: number;
    title: string;
    postContext: string;
};

export type PostsAndUsers = {
    setView: Dispatch<SetStateAction<string>>;
    isLoggedIn: boolean;
    currentUser: { id: number; isAdmin: boolean };
};

export type UserFormData = {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
};
