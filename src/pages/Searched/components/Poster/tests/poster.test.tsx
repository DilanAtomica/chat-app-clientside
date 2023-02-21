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

test("Should display name and image", () => {
    render(<MockPoster />);
    const posterImg =  screen.getByRole("img", {name: "Game of Thrones"});
    expect(posterImg).toBeInTheDocument();

    const posterName =  screen.getByText("Game of Thrones");
    expect(posterName).toBeInTheDocument();

});