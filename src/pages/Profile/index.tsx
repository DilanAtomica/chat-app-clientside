import React from 'react';
import "./index.css";
import Navbar from "../../components/Navbar";
import {useActiveChatQueues, useDeleteChatQueue} from "./hooks/api";
import LoadingScreen from "../../components/LoadingScreen";
import {BsTrashFill} from "react-icons/bs";
import SeriesInQueue from "./components/seriesInQueue";

type seriesType = {
    chatQueueID: number,
    seriesID: number,
    name: string,
    image: string,
    season: number,
    episode: number,
    created_at: Date,
}

function ProfilePage() {

    const {data, isFetching, refetch} = useActiveChatQueues();
    const {mutate} = useDeleteChatQueue();

    const deleteQueuedSeries = (chatQueueID: number) => {
        console.log(chatQueueID)
        mutate(chatQueueID);
        window.location.reload();
    }

    return (
        <div className="profilePage">
            {isFetching && <LoadingScreen />}
            <Navbar />
            <h1>Pending Chats</h1>

            <ul className="activeSeriesQueues">
                {data?.map((series: seriesType) => (
                    <SeriesInQueue key={series.chatQueueID} chatQueueID={series.chatQueueID} seriesID={series.seriesID} name={series.name}
                                   image={series.image} season={series.season} episode={series.episode} created_at={series.created_at}
                                   deleteQueuedSeries={deleteQueuedSeries} />

                ))}
            </ul>
        </div>
    );
}

export default ProfilePage;