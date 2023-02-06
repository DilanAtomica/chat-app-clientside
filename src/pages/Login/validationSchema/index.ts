import {z} from "zod";

export const validationSchema = z
    .object({
        email: z.string().min(1, { message: "Email is required" }).email({
            message: "Must be a valid email",
        }),
        password: z.string().min(1, { message: "Password is required" }),
    });

export type ValidationSchema = z.infer<typeof validationSchema>;
