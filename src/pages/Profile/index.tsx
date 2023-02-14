import React from 'react';
import "./index.css";
import Navbar from "../../components/Navbar";
import {useActiveChatQueues, useDeleteChatQueue} from "./hooks/api";
import LoadingScreen from "../../components/LoadingScreen";
import {BsTrashFill} from "react-icons/bs";

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

    const handleOnClick = (chatQueueID: number) => {
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
                    <li key={series.chatQueueID} className="seriesQueue">
                        <img alt={series.name} src={"https://image.tmdb.org/t/p/w500" + series.image} />
                        <div className="seriesQueueRight">
                            <h2>{series.name}</h2>
                            <h3>Season {series.season}</h3>
                            <h3>Episode {series.episode}</h3>
                            <button onClick={() => handleOnClick(series.chatQueueID)} type="button"><BsTrashFill id="trashIcon" /></button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProfilePage;