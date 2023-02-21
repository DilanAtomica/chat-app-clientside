import React from "react";
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {client} from "../../../../../lib/react-query";
import {QueryClientProvider} from "@tanstack/react-query";
import Message from "../index";

const MockMessageSent = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <Message messageID={1} messageSent={true} dateSent={"21.02.2023"}>Hello</Message>
            </BrowserRouter>
        </QueryClientProvider>
    )
};

const MockMessageReceived = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <Message messageID={1} messageSent={false} dateSent={"21.02.2023"}>Hello</Message>
            </BrowserRouter>
        </QueryClientProvider>
    )
};

test("Should show message sent, with correct message, date and styling", () => {
    render(<MockMessageSent />);

    const msgContainer = screen.getByRole("message");
    expect(msgContainer).toBeInTheDocument();
    expect(msgContainer).toHaveStyle({
        justifyContent: "flex-end",
    })

    const messageText = screen.getByText("Hello");
    expect(messageText).toBeInTheDocument();
    expect(messageText).toHaveStyle({
        backgroundColor: "rgba(15,98,254, 1)",
        color: "white",
        borderRadius: "15px 15px 0 15px",
        margin: "0 0 0.5rem 1rem"
    });

    const dateSent = screen.getByText("21.02.2023");
    expect(dateSent).toBeInTheDocument();
});

test("Should show message received, with correct message, date and styling", () => {
    render(<MockMessageReceived />);

    const msgContainer = screen.getByRole("message");
    expect(msgContainer).toBeInTheDocument();
    expect(msgContainer).toHaveStyle({
        justifyContent: "flex-start",
    })

    const messageText = screen.getByText("Hello");
    expect(messageText).toBeInTheDocument();
    expect(messageText).toHaveStyle({
        backgroundColor: "rgba(239,239,239, 0.8)",
        color: "black",
        borderRadius: "15px 15px 15px 0",
        margin: "0 0 0.5rem 1rem",
    });

    const dateSent = screen.getByText("21.02.2023");
    expect(dateSent).toBeInTheDocument();
});
