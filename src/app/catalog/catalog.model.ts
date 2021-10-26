export interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: any;
  rating: number;
  size: Size[];
}

export interface Size {
  id: number;
  size: string;
}