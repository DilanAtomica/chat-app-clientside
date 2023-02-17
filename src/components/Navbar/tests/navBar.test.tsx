import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {client} from "../../../lib/react-query";
import {QueryClientProvider} from "@tanstack/react-query";
import NavBar from "../index";
import userEvent from "@testing-library/user-event";

const MockNavBar = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        </QueryClientProvider>
    )
};

test("Should show notifications that are new and not read", async() => {
    const user = userEvent.setup();
    render(<MockNavBar />);
    const unReadNotifics = await screen.findByRole("unReadNotifics");
    await waitFor(() => {
        expect(unReadNotifics).toHaveTextContent("1")
    });

    const notificationsBtn = await screen.findByRole("notificationsBtn");
    await user.click(notificationsBtn);

    //Checks that both notifications are rendered
    const notifications = await screen.findAllByRole("notification");
    expect(notifications).toHaveLength(2);

    //Checks that notifications shows date
    const notificDates = await screen.findAllByRole("notificDate");
    expect(notificDates[0]).toHaveTextContent("1 February 2023");
    expect(notificDates[1]).toHaveTextContent("2 February 2023");

    //Clicks notification and checks that message shows
    await user.click(notifications[0]);
    const notificMsg = await screen.findByRole("notificMsg");
    expect(notificMsg).toHaveTextContent("A chat for a dicussion of The Walking Dead season 1, episode 1 has been made");

    //const unReadNotification = await screen.findByRole("heading", {name: "14 February 2023"});
    //expect(unReadNotification).toBeInTheDocument();

});
