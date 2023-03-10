import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {client} from "../../../lib/react-query";
import {QueryClientProvider} from "@tanstack/react-query";
import Login from "../index";

const MockLoginPage = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </QueryClientProvider>
    )
};

describe("Login Page", () => {
    it("Should show password", () => {
        render(<MockLoginPage />);
        const passwordInput = screen.getByRole("passwordInput");
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute("type", "password");
        const showPasswordBtn = screen.getByRole("showPasswordBtn");
        expect(showPasswordBtn).toBeInTheDocument();
        fireEvent.click(showPasswordBtn);
        expect(passwordInput).toHaveAttribute("type", "text");
    });

    it("Button should be enabled", () => {
        render(<MockLoginPage />);
        const submitBtn = screen.getByRole("submitBtn");
        expect(submitBtn).toBeInTheDocument();
        expect(submitBtn).not.toHaveAttribute("disabled");
    });
});