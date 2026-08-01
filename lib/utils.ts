import { clsx, type ClassValue } from "clsx"
import { error } from "console"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const calculateDiscount = (oldPrice:number | null | undefined,price:number ): number=>{
  if (!oldPrice || oldPrice <= price){
    return 0
  }
  return Math.round((oldPrice - price) * 100 / oldPrice)
}


export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};


