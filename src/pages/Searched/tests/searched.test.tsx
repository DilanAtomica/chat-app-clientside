import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {client} from "../../../lib/react-query";
import {QueryClientProvider} from "@tanstack/react-query";
import SearchedPage from "../index";
import userEvent from "@testing-library/user-event";

const MockSearchedPage = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <SearchedPage />
            </BrowserRouter>
        </QueryClientProvider>
    )
};

    test("Should type value in search field", () => {
        render(<MockSearchedPage />);
        const searchField = screen.getByRole("searchField");
        expect(searchField).toBeInTheDocument();
        fireEvent.change(searchField, {target: {value: 'Game'}})
        expect(searchField).toHaveValue("Game");
        const submitBtn = screen.getByRole("submitBtn");
        expect(submitBtn).toBeInTheDocument();
        expect(submitBtn).toBeEnabled();
        fireEvent.click(submitBtn);
    });

test.only("Renders poster with image and name and renders series modal after click", async() => {

    const user = userEvent.setup();

    render(<MockSearchedPage />);
        const imgPoster = await screen.findByAltText("Game of Thrones");
        expect(imgPoster).toBeInTheDocument();
        const posterName = await screen.findByText("Game of Thrones");
        expect(posterName).toBeInTheDocument();

        await user.click(posterName);
        const postModalHeader = await screen.findByRole("postModalHeader");
        expect(postModalHeader).toBeInTheDocument();
        const seriesModalImg = await screen.findByRole("seriesModalImg");
        expect(seriesModalImg).toBeInTheDocument();

        //See if all 3 seasons are rendered with correct value
        const seasonOptions = await screen.findAllByRole("seasonOption");
        expect(seasonOptions).toHaveLength(3);
        expect(seasonOptions[0]).toHaveValue("1");
        expect(seasonOptions[1]).toHaveValue("2");
        expect(seasonOptions[2]).toHaveValue("3");

        //Click select element and then option season 1
        const seasonSelectEle = await screen.findByRole("seasonSelect")
        expect(seasonSelectEle).toBeInTheDocument();
        const seasonOne = await screen.findByText("Season 1");
        expect(seasonOne).toBeInTheDocument();
        await user.click(seasonSelectEle);
        await user.selectOptions(seasonSelectEle, "1");

        //See if all 10 episodes are rendered with correct value
        const episodeOptions = await screen.findAllByRole("episodeOption");
        expect(episodeOptions).toHaveLength(10);
        expect(episodeOptions[0]).toHaveValue("1");
        expect(episodeOptions[9]).toHaveValue("10");

});

