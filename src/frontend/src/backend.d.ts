import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ProductId = string;
export interface UserProfile {
    name: string;
}
export interface Product {
    id: ProductId;
    name: string;
    affiliateUrl: string;
    imageUrl: string;
    shortDescription: string;
    category: Category;
    brand?: string;
    price?: number;
}
export enum Category {
    jewelry = "jewelry",
    fashion = "fashion",
    luxury = "luxury"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createProduct(product: Product): Promise<void>;
    deleteProduct(id: ProductId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProduct(id: ProductId): Promise<Product>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listProducts(): Promise<Array<Product>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateProduct(id: ProductId, updatedProduct: Product): Promise<void>;
}
