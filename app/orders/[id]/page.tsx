import { ArrowLeft, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { steps } from "@/lib/constants";
import { getOrderById } from "@/lib/orders";
import { getAddressById } from "@/lib/addresses";



export default async function OrderReview({params}:{params:Promise<{id:string}>}){
    const id = (await params).id;
    const order = (await getOrderById(id)) as {
        id?: string;
        orderCode?: string;
        createdAt?: string;
        status?: string | null;
        addressId?: string;
        totalItems?: number;
        totalAmount?: number;
        item?: Array<{
            id?: string;
            quantity: number;
            priceAtTime: string | number | null;
            product?: {
                title?: string;
                imageSrc?: string;
                amount?: string | null;
            };
        }>;
    } | null;
    const taxRate= 0.08;
    const subTotal = (order?.item ?? []).reduce((sum: number, p) => sum + (p.quantity * Number(p.priceAtTime ?? 0)), 0);
    const tax = taxRate * subTotal;
    const address = await getAddressById(order?.addressId);
    const orderAddress = encodeURIComponent(`${address?.street ?? ''}, ${address?.city ?? ''}`);
    const mapSrc = `https://maps.google.com/maps?q=${orderAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    const placedOn = order?.createdAt ? order.createdAt.split('T')[0] : 'Unknown date';
    const subtotalItems = order?.totalItems ?? 0;
    const totalAmount = order?.totalAmount ?? 0;

    return(
        <div className="flex flex-col gap-5 p-3 md:p-6 lg:p-10">
            <Link href='/orders' className="flex items-center gap-2 text-black/60 hover:text-black/75 transition-all cursor-pointer text-[0.8rem]"><ArrowLeft size={15}/> Back to Orders</Link >
            <div className="flex justify-between mb-3">
                <div className="flex flex-col">
                    <h1 className="text-veg-green text-[1.4rem] font-semibold">Order {order?.orderCode}</h1>
                    <span className="text-black/65 text-[0.8rem]">Placed on {placedOn}</span>
                </div>
                <div className="self-center text-orange-500 px-2 py-1 rounded-[10px] bg-orange-600/20 text-[0.8rem]">{order?.status}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 w-full">
                <div className="flex flex-col gap-5">
                    <div className="rounded-2xl overflow-hidden mb-5">
                        <iframe
                            src={mapSrc}
                            width="800"
                            height="300"
                            className="border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                        ></iframe>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="text-veg-green font-semibold text-[1rem]">Delivery Progress</h2>
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <div className="flex flex-col">
                                {steps.map((step, index) => {
                                const isLast = index === steps.length - 1;
                                const Icon = step.icon;
                                return (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div
                                            className={`flex items-center justify-center rounded-full transition-all ${'w-10 h-10 bg-[#f7f4ee] text-[#4a5568]'
                                            }`}
                                            >
                                            <Icon className={'w-4 h-4 stroke-[2.2]'} />
                                            </div>

                                            {!isLast && (
                                            <div className="w-[1.5px] h-10 bg-gray-200 my-1"></div>
                                            )}
                                        </div>

                                        <div className="pt-2 pb-5">
                                            <h4 className="font-semibold text-[0.9rem]">
                                            {step.title}
                                            </h4>
                                            {step.timestamp && (
                                            <p className="text-xs font-normal text-black/50 mt-1">
                                                {step.timestamp}
                                            </p>
                                            )}
                                        </div>
                                    </div>
                                );})}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-8 p-4">
                    <div className="flex flex-col gap-6">
                        <h3 className="flex items-center gap-2 text-[0.8rem] text-veg-green font-semibold"><MapPin size={15}/> Delivery Address</h3>
                        <ul className="flex flex-col text-black/60 text-[0.75rem]">
                            <li>{address?.label}</li>
                            <li>{address?.street}</li>
                            <li>{address?.city}, {address?.state} {address?.zipCode}</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-veg-green text-[0.8rem] font-semibold">Items ({order?.item?.length ?? 0})</h4>
                        {(order?.item ?? []).map((item, index) => (
                        <div key={item.id || index} className="flex justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-auto h-auto">
                                    <Image 
                                        alt={item.product?.title || 'Product'} 
                                        src={item.product?.imageSrc || '/placeholder.png'} 
                                        width={40} 
                                        height={40} 
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-veg-green text-[0.8rem]">
                                        {item.product?.title} {item.product?.amount}
                                    </span>
                                   
                                    <span className="text-black/60 text-[0.7rem]">x{item.quantity}</span>
                                </div>
                            </div>
                            <div className="self-end text-[0.8rem] text-veg-green font-semibold">
                                ${(Number(item.priceAtTime) * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                    </div>
                    <div className="flex flex-col gap-4 sticky top-24">
                        <div className="flex justify-between items-center">
                            <span className="text-[0.8rem] text-black/60">Subtotal ({subtotalItems} items)</span>
                            <span className="text-veg-green text-[0.8rem]">${subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span  className="text-[0.8rem] text-black/60">Delivery</span>
                            <span className="text-[0.8rem] font-medium text-green-500">Free</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span  className="text-[0.8rem] text-black/60">Tax</span>
                            <span className="text-veg-green text-[0.8rem]">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-t-veg-green/20 pt-5">
                            <span className="text-veg-green font-semibold text-[0.85rem]">Total</span>
                            <span className="text-veg-green font-semibold text-[0.85rem]">${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}