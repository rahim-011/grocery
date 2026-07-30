import { LoaderCircle } from "lucide-react";



export default function LoadingSpinner(){
    return(
        <div className="flex items-center justify-center min-h-screen w-full">
            <LoaderCircle className="text-veg-green animate-spin transition-all" size={25}/>
        </div>
    )
}