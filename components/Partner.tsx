import { Mail, Phone } from "lucide-react";




export default function Partner(){
    return(
        <div className="flex flex-col gap-2.5 border border-black/20 rounded-2xl p-4 max-w-[300px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div></div>
                    <div className="flex flex-col">
                        <span className="text-[0.9rem] font-semibold">Avinash</span>
                        <span className="text-black/50 text-[0.7rem]">Bike</span>
                    </div>
                </div>
                <div className="self-center text-[0.7rem] py-1 px-2 rounded-2xl bg-green-200">Active</div>
            </div>
            <div className="text-black/70 flex items-center gap-2.5 mt-3">
                <Mail size={15}/><span className="text-[0.8rem]">partner1@greatstack.dev</span>
            </div>
            <div className="text-black/70 flex items-center gap-2.5"><Phone size={16}/><span className="text-[0.8rem]">9876543210</span></div>
            <button className="text-white p-2.5 rounded-[10px] bg-red-500/90 text-[0.8rem] mt-2 transition-all hover:bg-red-500/100 cursor-pointer">Desactivate</button>
        </div>
    )
}