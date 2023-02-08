import React, {useEffect, useState} from 'react';
import "./index.css";
import Navbar from "../../components/Navbar";
import {useParams} from "react-router-dom";
import {useSeriesResult} from "./hooks/api";
import Button from "../../components/Form/Button";
import LoadingScreen from "../../components/LoadingScreen";

function SeriesPage() {

    const {seriesID} = useParams();

    const {data, isFetching} = useSeriesResult(seriesID);

    const [season, setSeason] = useState(1);
    const [episodes, setEpisodes] = useState<number[] | null>(null);

    useEffect(() => {
        let episodeCount = null;
        for(let i = 0; i < data?.seasons.length; i++) {
            if(data.seasons[i].season_number === season) {
                episodeCount = data.seasons[i].episode_count;
            }
        }
        let episodeList = [];
        for(let i = 1; i < episodeCount + 1; i++) {
            episodeList.push(i);
        }
        console.log("lol");
        setEpisodes(episodeList);
    }, [season, data]);

    return (
        <main className="seriesPage">
            {isFetching && <LoadingScreen />}
            <Navbar />
            <div className="seriesContent">
                <img src={data?.backdrop_path ? "https://image.tmdb.org/t/p/w500" + data.backdrop_path : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png"}
                     alt={data?.name} />
                <h1>{data?.name}</h1>
                <div className="seasons">
                    {data?.seasons.map((season: any) => (
                        season.name !== "Specials" &&
                        <Button setSeason={setSeason} seasonNumber={season.season_number} key={season.id}
                                buttonType={"button"} disabled={false} width={"max-content"}>{season.name}</Button>
                    ))}
                </div>

                <div className="episodes">
                    {episodes?.map((episode: any) => (
                        <Button key={episode}
                                buttonType={"button"} disabled={false} width={"max-content"}>{episode}</Button>
                    ))}
                </div>
            </div>

        </main>
    );
}

export default SeriesPage;