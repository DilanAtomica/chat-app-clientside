import React from 'react';
import "./index.css";
import {BsTrashFill} from "react-icons/bs";
import seriesType from "../../index";

type seriesType = {
    chatQueueID: number,
    seriesID: number,
    name: string,
    image: string,
    season: number,
    episode: number,
    created_at: Date,
    deleteQueuedSeries: (chatQueueID: number) => void,
}

function SeriesInQueue({chatQueueID, name, image, season, episode, deleteQueuedSeries} : seriesType) {

    const onClick = () => {
        deleteQueuedSeries(chatQueueID);
    }

    return (
        <li key={chatQueueID} className="seriesQueue">
            <img alt={name} src={"https://image.tmdb.org/t/p/w500" + image} />
            <div className="seriesQueueRight">
                <h2>{name}</h2>
                <h3>Season {season}</h3>
                <h3>Episode {episode}</h3>
                <button onClick={onClick} type="button"><BsTrashFill id="trashIcon" /></button>
            </div>
        </li>
    );
}

export default SeriesInQueue;