import React from 'react';
import "./index.css";
import Navbar from "../../components/Navbar";
import {useActiveChatQueues} from "./hooks/api";
import LoadingScreen from "../../components/LoadingScreen";
import Poster from "../Searched/components/Poster";

type seriesType = {
    seriesID: number,
    name: string,
    image: string,
    season: number,
    episode: number,
    created_at: Date,
}

function ProfilePage() {

    const {data, isFetching} = useActiveChatQueues();

    return (
        <div className="profilePage">
            {isFetching && <LoadingScreen />}
            <Navbar />
            <h1>Pending Chats</h1>

            <ul className="activeSeriesQueues">
                {data?.map((series: seriesType) => (
                    <li key={series.seriesID} className="seriesQueue">
                        <img alt={series.name} src={"https://image.tmdb.org/t/p/w500" + series.image} />
                        <div className="seriesQueueRight">
                            <h2>{series.name}</h2>
                            <h3>Season {series.season}</h3>
                            <h3>Episode {series.episode}</h3>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default ProfilePage;