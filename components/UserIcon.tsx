import { ChevronDown } from "lucide-react";



export default function UserIcon({letter='U',onShowProfile}:{letter:string|undefined,onShowProfile:()=>void}){
    return(
        <div className="flex items-center gap-2 cursor-pointer" onClick={onShowProfile}>
            <div className="text-white font-semibold rounded-full flex items-center px-2 py-[1px] bg-veg-green hover:bg-green-900 transition-all">{letter || 'U'}</div>
            <ChevronDown size={12} className="text-black/50"/>
        </div>
    )
}