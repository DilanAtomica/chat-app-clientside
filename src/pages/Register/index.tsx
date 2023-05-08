import React, {useState} from 'react';
import "./index.css";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import InputField from "../../components/Form/InputField";
import Button from "../../components/Form/Button";
import {Link, useNavigate} from "react-router-dom";
import Background from "../../components/Layout/Background";
import {useRegister} from "./hooks/api";
import {validationSchema} from "./validationSchema";
import {ValidationSchema} from "./validationSchema";
import useLoadingScreen from "../../stores/Loading";

function Register() {

    const [showPassword, setShowPassword] = useState(false);

    const {
        setError,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const validateInputs: SubmitHandler<ValidationSchema> = (inputData: ValidationSchema) => handleOnRegister(inputData);

    const {mutateAsync: registerUser, isLoading} = useRegister();
    const navigate = useNavigate();

    const handleOnRegister = async(inputData: ValidationSchema) => {
        try {
            await registerUser(inputData);
            navigate("/home");

        } catch(error: any) {
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
                <h1>Register</h1>
                <p>*Required field</p>
                <InputField obligated={true} label="Email" errorMsg={errors.email?.message} register={register} />
                <InputField obligated={true} label="Username" errorMsg={errors.username?.message} register={register} />
                <InputField obligated={true} label="Password" errorMsg={errors.password?.message} register={register} showPassword={showPassword}
                            setShowPassword={setShowPassword}/>
                <InputField obligated={true} label="Confirm Password" errorMsg={errors.confirmPassword?.message} register={register} showPassword={showPassword}
                            setShowPassword={setShowPassword} />
                <Button width={"15.5rem"} disabled={isLoading} buttonType={"submit"}>Sign Up</Button>
                <Link to="/login">Already have an account?</Link>
            </form>
        </main>
    );
}

export default Register;