import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {client} from "../../../lib/react-query";
import {QueryClientProvider} from "@tanstack/react-query";
import HomePage from "../index";

const MockHomePage = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        </QueryClientProvider>
    )
};

test("Should type value in search field", () => {
    render(<MockHomePage />);
    const searchField = screen.getByRole("searchField");
    expect(searchField).toBeInTheDocument();
    fireEvent.change(searchField, {target: {value: 'Game'}})
    expect(searchField).toHaveValue("Game");
    const submitBtn = screen.getByRole("submitBtn");
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeEnabled();
});
