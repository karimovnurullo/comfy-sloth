export namespace IEntity {
  // export interface ICategory {}
  export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: String[];
  }
}
export const baseURL = "https://dummyjson.com";
