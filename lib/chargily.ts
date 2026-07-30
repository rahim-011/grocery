import 'server-only';

import { ChargilyClient } from '@chargily/chargily-pay';


const client = new ChargilyClient({
    mode: process.env.NODE_ENV === 'production' ? 'live' : 'test',
    api_key: process.env.CHARGILY_SECRET_KEY!
})



export default client;






export interface  ChargilyWebhookEvent {
    id: string;
    type: 'checkout.paid' | 'checkout.failed' | string;
    data: {
        id: string;
        amount: number;
        status: string;
        metadata: Record<string, string> | null;
    };
}