import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {client} from "../../../lib/react-query";
import {QueryClientProvider} from "@tanstack/react-query";
import Register from "../index";

const MockRegisterPage = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        </QueryClientProvider>
    )
};

describe("Register Page", () => {
    it("Should show password", () => {
        render(<MockRegisterPage />);
        const passwordInput = screen.getByRole("passwordInput");
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute("type", "password");
        const showPasswordBtn = screen.getByRole("showPasswordBtn");
        expect(showPasswordBtn).toBeInTheDocument();
        fireEvent.click(showPasswordBtn);
        expect(passwordInput).toHaveAttribute("type", "text")
    })
});

describe("Register Page", () => {
    it("Should show confirm password", () => {
        render(<MockRegisterPage />);
        const confirmPasswordInput = screen.getByRole("confirmPasswordInput");
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toHaveAttribute("type", "password");
        const showConfirmPasswordBtn = screen.getByRole("showConfirmPasswordBtn");
        expect(showConfirmPasswordBtn).toBeInTheDocument();
        fireEvent.click(showConfirmPasswordBtn);
        expect(confirmPasswordInput).toHaveAttribute("type", "text")
    });

    it("Button should be enabled", () => {
        render(<MockRegisterPage />);
        const submitBtn = screen.getByRole("submitBtn");
        expect(submitBtn).toBeInTheDocument();
        expect(submitBtn).not.toHaveAttribute("disabled");
    });
});