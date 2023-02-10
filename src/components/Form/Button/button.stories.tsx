import Button from "./index";
import {ReactNode} from "react";

export default {
    title: "Button",
    component: Button,
}

type buttonProps = {
    children: ReactNode;
    buttonType: "button" | "submit";
    disabled: boolean,
    width: string,
}

const Template = (args: buttonProps) => <Button {...args}>{args.children}</Button>

export const Login = Template.bind({})
export const Register = Template.bind({})

// @ts-ignore
Login.args = {
    children: "Login",
    buttonType: "submit",
    disabled: false,
}

// @ts-ignore
Register.args = {
    children: "Register",
    buttonType: "submit",
    disabled: false,
}
