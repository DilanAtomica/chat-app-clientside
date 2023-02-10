import {MouseEventHandler} from "react";

export type chatType = {
    chatID: number,
    otherUserName: string,
    seriesSeason: string,
    seriesEpisode: string,
    seriesName: string,
    seriesImage: string,
    created_at: Date,
    onClick: MouseEventHandler<HTMLButtonElement>,
}