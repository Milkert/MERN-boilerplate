import { rateLimit } from "express-rate-limit";

export const loginLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 login attempts per windowMs
    message: {
        error: 'Too many login attempts, please try again after 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true, // Don't count successful requests
});

export const signupLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 2, // limit each IP to 2 successful signups per hour
    message: {
        error: 'Too many signups from this IP, please try again after 1 hour.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: true, // Don't count failed signup attempts, only successful ones
});