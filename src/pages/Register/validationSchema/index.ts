import {z} from "zod";

export const validationSchema = z
    .object({
        email: z.string().trim().min(1, { message: "Email is required" }).email({
            message: "Must be a valid email",
        }),
        username: z.string().trim().min(1, { message: "Username is required" }),
        password: z.string().trim().min(8, { message: "Must be at least 8 characters in length" })
            .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
            .regex(new RegExp(".*[a-z].*"), "One lowercase character")
            .regex(new RegExp(".*\\d.*"), "One number"),
        confirmPassword: z.string().trim().min(8, { message: "Must be at least 8 characters in length" }),
    }).refine((data) => {
        return data.confirmPassword === data.password
    }, {
        message: "Password doesn't match",
        path: ["confirmPassword"]
    });

export type ValidationSchema = z.infer<typeof validationSchema>;