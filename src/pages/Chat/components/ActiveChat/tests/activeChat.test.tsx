import React from "react";
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {client} from "../../../../../lib/react-query";
import {QueryClientProvider} from "@tanstack/react-query";
import ActiveChat from "../index";

const MockActiveChat = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <ActiveChat chatID={1} otherUserName={"Alex"} seriesSeason={"5"} seriesEpisode={"1"} seriesName={"Game of Thrones"}
                            seriesImage={"/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg"} created_at={new Date("2023-02-10T16:17:46.000Z")} />
            </BrowserRouter>
        </QueryClientProvider>
    )
};

test("Should show message sent, with correct message, date and styling", () => {
    render(<MockActiveChat />);

    const seriesImg = screen.getByRole("img");
    expect(seriesImg).toBeInTheDocument();
    expect(seriesImg).toHaveAttribute("src", "https://image.tmdb.org/t/p/w500/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg");
    expect(seriesImg).toHaveAttribute("alt", "Game of Thrones");

    const seriesName = screen.getAllByRole('listitem').find(listitem => listitem.textContent === 'Game of Thrones');
    expect(seriesName).toBeInTheDocument();

    const seasonAndEpisode = screen.getAllByRole('listitem').find(listitem =>
        listitem.textContent === "Season 5 · Episode 1");
    expect(seasonAndEpisode).toBeInTheDocument();

    const otherUsersName = screen.getAllByRole('listitem').find(listitem => listitem.textContent === "Chatting with Alex");
    expect(otherUsersName).toBeInTheDocument();

});

