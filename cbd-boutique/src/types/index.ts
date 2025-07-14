export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  videoUrl: string;
  orderLink: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopConfig {
  name: string;
  description: string;
  backgroundColor: string;
  backgroundImage: string;
  isDarkMode: boolean;
  footer: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface AdminConfig {
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}