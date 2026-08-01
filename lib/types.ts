

export interface OrderItemSummary {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    priceAtTime: number;
    product: {
        title: string;
        imageSrc: string;
    };
}

export interface UserOrder {
    id: string;
    userId: string;
    addressId: string;
    orderCode: string;
    currency: string;
    status: string;
    totalAmount: number;
    totalItems: number;
    createdAt: string;
    updatedAt: string;
    item: OrderItemSummary[];
}

export interface AdminOrderRecord extends UserOrder {
    name: string;
    email: string;
    user: {
        name: string;
        email: string;
    };
}