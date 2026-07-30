import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function FailedPay() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-10 h-10" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
                <p className="text-gray-600 mb-6">Something went wrong with your transaction. Please try again.</p>
                <Link
                    href="/products"
                    className="block w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
                >
                    Back to products
                </Link>
            </div>
        </main>
    );
}