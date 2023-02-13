import {MouseEventHandler} from "react";

export type chatType = {
    chatID: number,
    otherUserName: string,
    seriesSeason: string,
    seriesEpisode: string,
    seriesName: string,
    seriesImage: string,
    created_at: Date,
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

export type sendMessageType = {
    chatID: number,
    text: string,
}

export type messageType = {
    messageID: number,
    message: string,
    messageSent: boolean,
    dateSent: string,
}
