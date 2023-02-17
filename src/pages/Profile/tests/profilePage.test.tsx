import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {client} from "../../../lib/react-query";
import {QueryClientProvider} from "@tanstack/react-query";
import ProfilePage from "../index";

const MockProfilePage = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
            </QueryClientProvider>
    )
};

test("Active chat queue should render", async() => {
    render(<MockProfilePage />);
    const queueImage = await screen.findByAltText("Game Shakers");
    expect(queueImage).toBeInTheDocument();
    const seriesName = await screen.findByRole("heading", {name: "Game Shakers"});
    expect(seriesName).toBeInTheDocument();
    const seasonNumber = await screen.findByRole("heading", {name: "Season 1"});
    expect(seasonNumber).toBeInTheDocument();
    const episodeNumber = await screen.findByRole("heading", {name: "Episode 1"});
    expect(episodeNumber).toBeInTheDocument();

});
