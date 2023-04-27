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
import useLoadingScreen from "../../stores/Loading";

function Login() {

    const {
        setError,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const validateInputs: SubmitHandler<ValidationSchema> = (inputData: ValidationSchema) => handleOnLogin(inputData);

    const [showPassword, setShowPassword] = useState(false);

    const {isLoading, mutateAsync: login} = useLogin();

    const {activateLoadingScreen, deActivateLoadingScreen} = useLoadingScreen();
    const navigate = useNavigate();

    const handleOnLogin = async(inputData: ValidationSchema) => {
        try {
            activateLoadingScreen();
            await login(inputData);
            deActivateLoadingScreen();
            navigate("/home");
        } catch(error: any) {
            if(error.response.data.errorType === "noEmail") {
                setError("email", {type: "404", message: error.response.data.message});
            }
            else if(error.response.data.errorType === "wrongComb") {
                setError("email", {type: "404", message: error.response.data.message});
                setError("password", {type: "404", message: error.response.data.message});
            }
        }
    };

    return (
        <main className="login">
            <Background />
            <form onSubmit={handleSubmit(validateInputs)}>
                <h1>Login {import.meta.env.VITE_REACT_API_URL}</h1>
                <p>*Required field</p>

                <InputField obligated={true} label={"Email"} errorMsg={errors.email?.message} register={register} />

                <InputField obligated={true} label={"Password"} setShowPassword={setShowPassword} showPassword={showPassword}
                            errorMsg={errors.password?.message} register={register} />

                <Button width={"15.5rem"} buttonType={"submit"} disabled={isLoading}>Sign In</Button>
                <Link to="/register">Register an account</Link>
            </form>
        </main>
    );
}

export default Login;