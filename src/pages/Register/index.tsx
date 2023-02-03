import React, {useState} from 'react';
import "./index.css";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import InputField from "../../components/Form/InputField";
import Button from "../../components/Form/Button";
import {Link} from "react-router-dom";
import Background from "../../components/Layout/Background";
import {registerUser} from "./api"


const validationSchema = z
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

type ValidationSchema = z.infer<typeof validationSchema>;

function Register() {

    const [showPassword, setShowPassword] = useState(false);

    const [test, setTest] = useState("");
    const {
        setError,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const validateInputs: SubmitHandler<ValidationSchema> = (inputData: ValidationSchema) => handleOnRegister(inputData);

    const handleOnRegister = async(inputData: ValidationSchema) => {
        try {
            await registerUser(inputData);
        } catch(error: any) {
            console.log(error);
            if(error.response.data.usernameTaken) {
                setError("username", {type: "409", message: "That username is already taken"});
            }
            if(error.response.data.emailTaken) {
                setError("email", {type: "409", message: "That Email is already taken"});
            }
        }
    };


    return (
        <main  onSubmit={handleSubmit(validateInputs)} className="register">
            <Background />
            <form>
                {test}
                <h1>Register</h1>
                <InputField label="Email" errorMsg={errors.email?.message} register={register} />
                <InputField label="Username" errorMsg={errors.username?.message} register={register} />
                <InputField label="Password" errorMsg={errors.password?.message} register={register} showPassword={showPassword}
                            setShowPassword={setShowPassword}/>
                <InputField label="Confirm Password" errorMsg={errors.confirmPassword?.message} register={register} showPassword={showPassword}
                            setShowPassword={setShowPassword} />

                <Button buttonType={"submit"}>Sign Up</Button>
                <Link to="/login">Already have an account?</Link>
            </form>

        </main>
    );
}

export default Register;