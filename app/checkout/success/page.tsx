import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPaid() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful</h1>
                <p className="text-gray-600 mb-6">Your payment has been successfully processed.</p>
                <Link
                    href="/"
                    className="block w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    );
}