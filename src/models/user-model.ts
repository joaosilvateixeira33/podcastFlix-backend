export interface UserModel {
    id?: string;
    name: string;
    email: string;
    password: string;
    categories: string[];
    createdAt: Date;
}