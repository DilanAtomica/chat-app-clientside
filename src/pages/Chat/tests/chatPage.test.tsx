import React from "react";
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {client} from "../../../lib/react-query";
import {QueryClientProvider} from "@tanstack/react-query";
import ChatPage from "../index";
import userEvent from "@testing-library/user-event";

const MockChatPage = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <ChatPage />
            </BrowserRouter>
        </QueryClientProvider>
    )
};

test("Should show chats and click on one to open chat modal", async() => {
    const user = userEvent.setup();
    render(<MockChatPage />);

    //Clicks chats modal to bring up chats
    const chatsBtn = await screen.findByRole("submitBtn");
    expect(chatsBtn).toBeInTheDocument();
    await user.click(chatsBtn);

    //Checks that chat modal renders
    const chatsModal = await screen.findByRole("chatsModal");
    expect(chatsModal).toBeInTheDocument();

    //Checks that series name is displayed
    const seriesName = await (await screen.findAllByRole('listitem')).find(listitem => listitem.textContent === 'Game of Thrones');
    expect(seriesName).toBeInTheDocument();

    //Checks that series episode and season is displayed
    const seasonAndEpisode = await (await screen.findAllByRole('listitem'))
        .find(listitem => listitem.textContent === 'Season 4 · Episode 8');
    expect(seasonAndEpisode).toBeInTheDocument();

    //Checks that user chatting with's name is displayed
    const userChattingWith = await (await screen.findAllByRole('listitem'))
        .find(listitem => listitem.textContent === 'Chatting with vidar');
    expect(userChattingWith).toBeInTheDocument();

    //Clicks on a chat and checks that chat modal is removed
    const activeChat = await screen.findAllByRole("activeChatBtn");
    await user.click(activeChat[0]);
    expect(chatsModal).not.toBeInTheDocument();

});

test("Should show messages in chat window for the chat that was clicked in chat modal", async() => {
    const user = userEvent.setup();
    render(<MockChatPage />);

    //Clicks chats modal to bring up chats
    const chatsBtn = await screen.findByRole("submitBtn");
    await user.click(chatsBtn);


    //Checks that chat modal renders
    const chatsModal = await screen.findByRole("chatsModal");
    expect(chatsModal).toBeInTheDocument();

    //Clicks on a chat and checks that chat modal is removed
    const activeChat = await screen.findAllByRole("activeChatBtn");
    await user.click(activeChat[0]);

    //Checks that series image is rendered
    const seriesImg = await screen.findByAltText("Game of Thrones");
    expect(seriesImg).toBeInTheDocument();

    //Checks that series name is displayed
    const seriesName = await (await screen.findAllByRole('listitem')).find(listitem => listitem.textContent === 'Game of Thrones');
    expect(seriesName).toBeInTheDocument();

    //Checks that series episode and season is displayed
    const episodeAndSeason = await (await screen.findAllByRole('listitem')).find(listitem => listitem.textContent === '· Season 4 · Episode 8 ·');
    expect(episodeAndSeason).toBeInTheDocument();

    //Check that messages are rendered and have proper background colors
    const msgSent = await screen.getByText("skjera");
    expect(msgSent).toBeInTheDocument();
    expect(msgSent).toHaveStyle({backgroundColor: "rgba(15,98,254, 1)"});
    const msgReceived = await screen.getByText("ikke stort");
    expect(msgReceived).toBeInTheDocument();
    expect(msgReceived).toHaveStyle({backgroundColor: "rgba(239,239,239, 0.8)"});


    //Checks that messages are rendered
    const messages = await screen.findAllByRole("message");
    expect(messages[0]).toBeInTheDocument()
    expect(messages[1]).toBeInTheDocument();


    //Checks that shows message and has right style and text
    const message = await screen.findAllByRole("msgText");
    expect(message[0]).toHaveTextContent("skjera");
    expect(message[0]).toHaveStyle({
        backgroundColor: "rgba(15,98,254, 1)",
        color: "white",
        borderRadius: "15px 15px 0 15px",
        margin: "0 0 0.5rem 1rem"
    });

    expect(message[1]).toHaveTextContent("ikke stort");
    expect(message[1]).toHaveStyle({
        backgroundColor: "rgba(239,239,239, 0.8)",
        color: "black",
        borderRadius: "15px 15px 15px 0",
        margin: "0 0 0.5rem 1rem",
    });

    //Checks that messages shows correct dates
    const dates = await screen.findAllByRole("dateSent");
    expect(dates[0]).toHaveTextContent("14.11.2023");
    expect(dates[1]).toHaveTextContent("14.11.2023");

});