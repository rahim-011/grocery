
import { signOut } from "@/lib/auth-client";
import { ArrowUpRight, LogOut, MapPin, Package,Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";




export default function UserProfile({name,email,onShowProfile}:{name:string,email:string,onShowProfile: () => void}){
    const profileLinks = [
        {icon:<Package size={16}/>,title:'My Orders',link:'/orders'},
        {icon:<MapPin size={16}/>,title:'Addresses',link:'/addresses'},
        {icon:<ArrowUpRight size={16}/>,title:'Products',link:'/products'},
    ]
    const router = useRouter();
    const handleSignOut = async () =>{
        await signOut({
            fetchOptions:{
                onSuccess:()=>{
                    router.push('/sign-in')
                }
            }
        })
    }


    return(
        <div className="flex flex-col gap-2 bg-white rounded-2xl min-w-[200px]">
            <div className="flex flex-col gap-1 p-4">
                <span className="text-black text-[0.75rem]">{name}</span>
                <span className="text-[0.6rem] text-black/60">{email}</span>
            </div>
            <div className="border-t border-t-black/20">
                <ul className="flex flex-col gap-4 p-4">
                    {profileLinks.map((link,index)=>(
                        <Link href={link.link} key={index} className="flex items-center gap-2 text-black/55 hover:text-black/85 transition-all cursor-pointer text-[0.8rem]" onClick={onShowProfile}>{link.icon}{link.title}</Link>
                    ))}
                </ul>
            </div>
            <div className="p-4 flex flex-col gap-4">
                <Link href='/admin' className="text-orange-500 hover:text-orange-600 text-[0.8rem] transition-all cursor-pointer flex items-center gap-2" onClick={onShowProfile}><Shield size={16}/>Admin Panel</Link> 
                <button className="flex items-center gap-3 text-red-500 hover:text-red-700 transition-all cursor-pointer text-[0.8rem]" onClick={handleSignOut}><LogOut size={16}/>Logout</button>
            </div>
        </div>
    )
}