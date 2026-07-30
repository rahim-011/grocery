import { Products } from '@prisma/client'
import {create} from 'zustand'



interface FilterStore {
    isFilterOpen:boolean,
    closeFilter: () => void,
    openFilter : () => void,
    setSearchQuery: (searchQuery:string) => void,
    setCategoryQuery: (categoryQuery:string) => void,
    clearSearchQuery: () => void,
    searchQuery:string,
    categoryQuery:string,
    maxPrice:string,
    minPrice:string,
    filterProducts: (products:Products[]) => Products[],
    setPrice: (price:string,type:string) => void;
    clearAllFilters: () => void,
    foundedProducts:number,
    setFoundedProducts: (count:number) => void,
    sortType:string|null,
    setSortType: (type:string) => void;
}

export const useFilterStore = create<FilterStore>((set,get)=>({
    foundedProducts:0,
    sortType:'',
    isFilterOpen:false,
    searchQuery:'',
    categoryQuery:'',
    maxPrice:'',
    minPrice:'',
    closeFilter: () => set({isFilterOpen:false}),

    openFilter: () => set({isFilterOpen:true}),

    setSearchQuery: (searchQuery:string) => set({searchQuery:searchQuery}),

    setCategoryQuery: (categoryQuery:string) => set({categoryQuery:categoryQuery}),

    setPrice: (price:string,type:string) =>{
        if (type === 'maxPrice'){
            set({maxPrice:price})
        }
        if (type === 'minPrice'){
            set({minPrice:price})
        }
    },
    clearSearchQuery : () => set({searchQuery:''}),
    clearAllFilters : () => set({categoryQuery:'',maxPrice:'',minPrice:'',sortType:''}),
    setSortType : (type:string) => {
        set({sortType:type})
    },
    filterProducts: (products:Products[]):Products[] =>{
        const {searchQuery,categoryQuery,maxPrice,minPrice,sortType} = get();
        let filtredProducts = [...products];
        if (searchQuery.trim()){
            filtredProducts = filtredProducts.filter(product => product.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
        }
        if (categoryQuery.trim()){
            if (categoryQuery.trim() && categoryQuery.toLowerCase() !== 'all categories'){
                filtredProducts = filtredProducts.filter(product => product.category.toLowerCase() === categoryQuery.toLowerCase())
            }
        }
        if (maxPrice && maxPrice.trim()){
            filtredProducts = filtredProducts.filter(product => Number(product.price) <= Number(maxPrice));
        }
        if (minPrice && minPrice.trim()){
            filtredProducts = filtredProducts.filter(product => Number(product.price) >= Number(minPrice))
        }
        
        switch (sortType) {
            case 'a-to-z': {
                return filtredProducts = filtredProducts.sort((a,b) => a.title.localeCompare(b.title))
            }
            case 'newest':{
                return filtredProducts = filtredProducts.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }
            case 'low-to-high' : {
                return filtredProducts = filtredProducts.sort((a,b) => a.price - b.price)
            }
            case 'high-to-low' : {
                return filtredProducts = filtredProducts.sort((a,b) => b.price -  a.price)
            }
            case 'top-rated' : {
                return filtredProducts = filtredProducts.sort((a,b)=> Number(b.rating) - Number(a.rating))
            }
            default: {
                break;
            }
        }

        return filtredProducts;
    },
    setFoundedProducts: (count:number) =>{set({foundedProducts:count})}
    
}))