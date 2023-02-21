import React from "react";
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {client} from "../../../../../lib/react-query";
import {QueryClientProvider} from "@tanstack/react-query";
import Poster from "../../Poster";

const MockPoster = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <Poster  id={1} poster={"/xYTnihl7qffiLSZ6yLMSpBkPdXC.jpg"} name={"Game of Thrones"}/>
            </BrowserRouter>
        </QueryClientProvider>
    )
};

test("Should display name and image with correct attributes", () => {
    render(<MockPoster />);
    const posterImg =  screen.getByRole("img");
    expect(posterImg).toBeInTheDocument();
    expect(posterImg).toHaveAttribute("src", "https://image.tmdb.org/t/p/w500/xYTnihl7qffiLSZ6yLMSpBkPdXC.jpg");
    expect(posterImg).toHaveAttribute("alt", "Game of Thrones");

    const posterName =  screen.getByText("Game of Thrones");
    expect(posterName).toBeInTheDocument();

});