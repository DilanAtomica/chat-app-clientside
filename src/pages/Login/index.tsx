import React, {useState} from 'react';
import "./index.css";
import {Link, useNavigate} from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../components/Form/InputField";
import Button from "../../components/Form/Button";
import Background from "../../components/Layout/Background";
import {useLogin} from "./hooks/api";
import {validationSchema} from "./validationSchema";
import {ValidationSchema} from "./validationSchema";

function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const validateInputs: SubmitHandler<ValidationSchema> = (inputData: ValidationSchema) => handleOnLogin(inputData);

    const [showPassword, setShowPassword] = useState(false);

    const {isLoading, mutateAsync: login} = useLogin();

    const navigate = useNavigate();

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

                <Button buttonType={"submit"} disabled={isLoading}>Sign In</Button>
                <Link to="/register">Register an account</Link>
            </form>
        </main>
    );
}

export default Login;