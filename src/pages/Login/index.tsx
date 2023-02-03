import React, {useState} from 'react';
import "./index.css";
import {Link, useNavigate} from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../../components/Form/InputField";
import Button from "../../components/Form/Button";
import Background from "../../components/Layout/Background";
import {login} from "./api";

const validationSchema = z
    .object({
        email: z.string().min(1, { message: "Email is required" }).email({
            message: "Must be a valid email",
        }),
        password: z.string().min(1, { message: "Password is required" }),
    });

type ValidationSchema = z.infer<typeof validationSchema>;

function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const validateInputs: SubmitHandler<ValidationSchema> = (inputData: ValidationSchema) => handleOnLogin(inputData);

    const handleOnLogin = async(inputData: ValidationSchema) => {
        try {
            await login(inputData);
            navigate("/home");
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <main className="login">
            <Background />

            <form onSubmit={handleSubmit(validateInputs)}>
                <h1>Login</h1>

                <InputField label={"Email"} errorMsg={errors.email?.message} register={register} />

                <InputField label={"Password"} setShowPassword={setShowPassword} showPassword={showPassword}
                            errorMsg={errors.password?.message} register={register} />

                <Button buttonType={"submit"}>Sign In</Button>
                <Link to="/register">Register an account</Link>
            </form>
        </main>
    );
}

export default Login;