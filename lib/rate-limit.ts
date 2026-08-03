import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const rateLimiters = {
    auth: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "60 s"),
        prefix: "ratelimit:auth",
    }),
    checkout: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "60 s"),
        prefix: "ratelimit:checkout",
    }),
    api: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, "10 s"),
        prefix: "ratelimit:api",
    }),
};

export function getIp(request: Request) {
    return request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'anonymous';
}