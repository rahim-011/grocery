import { Clock, Check, Truck, Package } from 'lucide-react';


export const categories:string[] = ['All Categories','Fruits & Vegetables','Personal Care','Pantry Staples','Bakery','Beverages','Meat & Seafood','Snacks','Frozen Foods','Baby Care']


export const steps = [
  {
    title: 'Placed',
    timestamp: 'Jul 22, 12:30 AM',    icon: Clock,
  },
  {
    title: 'Confirmed',
    icon: Check,
  },
  {
    title: 'Assigned',
    icon: Truck,
  },
  {
    title: 'Packed',
    icon: Package,
  },
  {
    title: 'Out for Delivery',
    icon: Truck,
  },
  {
    title: 'Delivered',
    icon: Check,
  },
];