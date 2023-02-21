import React from "react";
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {client} from "../../../../../lib/react-query";
import {QueryClientProvider} from "@tanstack/react-query";
import SeriesInQueue from "../../seriesInQueue";

const MockSeriesInQueue = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <SeriesInQueue chatQueueID={1} seriesID={2} name={"Game of Thrones"} image={"/f49nYnZUowcVKCOC1FRFkKDR7bg.jpg"}
                               season={2} episode={5} created_at={new Date("2023-02-14T14:26:28.000Z")}
                               deleteQueuedSeries={() => console.log("deleteSeriesInQueueFN")} />
            </BrowserRouter>
        </QueryClientProvider>
    )
};

test("Should display series queue info and delete btn", () => {
    render(<MockSeriesInQueue />);
    const seriesImage = screen.getByRole("img");
    expect(seriesImage).toBeInTheDocument();
    expect(seriesImage).toHaveAttribute("src", "https://image.tmdb.org/t/p/w500" + "/f49nYnZUowcVKCOC1FRFkKDR7bg.jpg")
    expect(seriesImage).toHaveAttribute("alt", "Game of Thrones");

    const seriesName = screen.getByRole("heading", {level: 2, name: "Game of Thrones"});
    expect(seriesName).toBeInTheDocument();

    const season = screen.getByRole("heading", {level: 3, name: "Season 2"});
    expect(season).toBeInTheDocument();

    const episode = screen.getByRole("heading", {level: 3, name: "Episode 5"});
    expect(episode).toBeInTheDocument();

    const deleteBtn = screen.getByRole("button");
    expect(deleteBtn).toBeInTheDocument();
    expect(deleteBtn).toHaveAttribute("type", "button");
    expect(deleteBtn).toBeEnabled();


});