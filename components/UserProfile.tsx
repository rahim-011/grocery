
import { signOut, useSession } from "@/lib/auth-client";
import { ArrowUpRight, LogOut, MapPin, Package, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserProfile({ name, email, onShowProfile }: { name: string; email: string; onShowProfile: () => void }) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const profileLinks = [
    { icon: <Package size={16} />, title: "My Orders", link: "/orders" },
    { icon: <MapPin size={16} />, title: "Addresses", link: "/addresses" },
    { icon: <ArrowUpRight size={16} />, title: "Products", link: "/products" },
  ];

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <div className="flex min-w-50 flex-col gap-2 rounded-2xl bg-white">
      <div className="flex flex-col gap-1 p-4">
        <span className="text-[0.75rem] text-black">{name}</span>
        <span className="text-[0.6rem] text-black/60">{email}</span>
      </div>
      <div className="border-t border-t-black/20">
        <ul className="flex flex-col gap-4 p-4">
          {profileLinks.map((link, index) => (
            <Link href={link.link} key={index} className="flex cursor-pointer items-center gap-2 text-[0.8rem] text-black/55 transition-all hover:text-black/85" onClick={onShowProfile}>
              {link.icon}
              {link.title}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {isAdmin && (
          <Link href="/admin" className="flex cursor-pointer items-center gap-2 text-[0.8rem] text-orange-500 transition-all hover:text-orange-600" onClick={onShowProfile}>
            <Shield size={16} />
            Admin Panel
          </Link>
        )}
        <button className="flex cursor-pointer items-center gap-3 text-[0.8rem] text-red-500 transition-all hover:text-red-700" onClick={handleSignOut}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}