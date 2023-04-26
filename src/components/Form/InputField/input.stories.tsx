import InputField from "./index";

export default {
    title: "InputField",
    component: InputField,
}

type inputFieldProps = | ({
    label: "Email" | "Username",
    showPassword?: never,
    setShowPassword?: never,
} | {
    label: "Password" | "Confirm Password",
    showPassword: boolean,
    setShowPassword: (showPassword: boolean) => void,
}) & {
    errorMsg: string | undefined,
    obligated: boolean,
    register: any,
}

const Template = (args: inputFieldProps) => <InputField {...args} />

export const EmailInput = Template.bind({});
// @ts-ignore
EmailInput.args = {
    label: "Email",
    errorMsg: undefined,
}


export const EmailInputError = Template.bind({});
// @ts-ignore
EmailInputError.args = {
    label: "Email",
    errorMsg: "This field is required!",
}

export const PasswordInput = Template.bind({});
// @ts-ignore
PasswordInput.args = {
    label: "Password",
    errorMsg: undefined,
}


export const PasswordInputError = Template.bind({});
// @ts-ignore
PasswordInputError.args = {
    label: "Password",
    errorMsg: "This field is required!",
}

