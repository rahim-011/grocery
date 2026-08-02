import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Poppins, EB_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SideCart from "@/components/SideCart";
import Overlay from "@/components/Overlay";
import AppMain from "@/components/AppMain";
import { Suspense } from "react";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '500', '700', '800']
});

export const ebGarmond = EB_Garamond({
  subsets: ['latin'],
  weight: ['800']
});

export const metadata: Metadata = {
  title: "Grocery",
  description: "Delivery of fruits and vegetables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={`${poppins.className} h-full antialiased`}>
        <body className="min-h-full flex flex-col w-full">
          <Overlay />
          <SideCart />
          <header>
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            
          </header>
          
          <AppMain>{children}</AppMain>

          <footer>
            <Footer />
          </footer>

          <Toaster 
            position="top-center" 
            closeButton
            style={{ zIndex: 99999 }}
            toastOptions={{
              className: "!min-w-0 !w-[calc(100vw-1rem)] !max-w-[calc(100vw-1rem)] !rounded-2xl !p-4 !shadow-2xl !border !bg-white/95 !backdrop-blur-md font-sans sm:!w-auto sm:!max-w-none sm:!min-w-[360px]",
              classNames: {
                success: "!border-emerald-500/30 !text-emerald-900",
                error: "!border-rose-500/30 !text-rose-900",
                loading: "!border-amber-500/30 !text-amber-900",
                description: "!text-slate-500 !text-xs !mt-1 !font-normal leading-relaxed",
                closeButton: "!bg-slate-50 !text-slate-400 hover:!text-slate-600 hover:!bg-slate-100 !border-none !transition-colors"
              }
            }}
          />
        </body>
      </html>
  );
}