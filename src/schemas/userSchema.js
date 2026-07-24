import * as z from "zod";
import userRepository from "../repositories/userRepository";

export const createUserSchema = z.object({
    email: z.string()
        .email({ message: "Invalid email address" })
        .min(10, { message: "Email must be at least 10 characters long"})
        .refine(async (value) => {
            const result = await userRepository.findByEmail(value);
            
            return !result;
        }, { message: 'Email already exists' }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long"})
        .regex(/^[a-zA-Z0-9]+$/, { message: "Password must contain at least one letter and one number"}),
    repeatPassword: z.string()
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
}).transform(({repeatPassword, ...data}) => data)