import React, {useEffect, useState} from 'react';
import "./index.css";
import {RxCross1} from "react-icons/rx";
import {useSeriesResult} from "./hooks/api"
import useSeriesModal from "../../../../stores/SeriesModal";
import Button from "../../../../components/Form/Button";
import LoadingScreen from "../../../../components/LoadingScreen";
import { v4 as uuidv4 } from 'uuid';

function SeriesModal() {

    const seriesModal = useSeriesModal();
    const {data, isFetching} = useSeriesResult(seriesModal.seriesID);

    const [season, setSeason] = useState<number | null>(null);
    const [episodeInput, setEpisodeInput] = useState<string | null>(null);
    const [episodes, setEpisodes] = useState<number[] | null>(null);

    useEffect(() => {
        if(season) {
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
            console.log("Useeffect: Series Modal")
            setEpisodes(episodeList);
        }
    }, [season, data]);

    const onBackgroundClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target instanceof HTMLElement) {
            if(e.target.classList.contains("seriesModalContainer")) seriesModal.deActivateSeriesModal();
        }
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div onClick={onBackgroundClick} className="seriesModalContainer">
            {isFetching && <LoadingScreen />}
            <div className="seriesModal">
                <header>
                    <button onClick={() => seriesModal.deActivateSeriesModal()} type="button"><RxCross1 id="exitIcon" /></button>
                    <h1>{data?.name}</h1>
                </header>

                <div className="seriesContent">
                    <img src={data?.backdrop_path ? "https://image.tmdb.org/t/p/w500" + data.backdrop_path : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png"}
                         alt={data?.name} />

                    <form onSubmit={handleOnSubmit}>
                        <label htmlFor="episodes">Choose a season:</label>
                        <select onChange={(e) => setSeason(parseInt(e.target.value))} name="seasons" id="seasons">
                            {data?.seasons.map((season: any) => (
                                season.name !== "Specials" &&
                                <option key={uuidv4()} value={season.season_number}>Season {season.season_number}</option>
                            ))}
                        </select>


                        <label htmlFor="episodes">Choose an episode:</label>
                        <select disabled={season === null} onChange={(e) => setEpisodeInput(e.target.value)} name="episodes" id="episodes">
                            {episodes?.map((episode: any) => (
                            <option key={uuidv4()} value={episode}>Episode {episode}</option>
                            ))}
                        </select>
                        <Button buttonType={"submit"} disabled={false} width={"max-content"}>Find a chatter</Button>
                    </form>

                </div>
            </div>

        </div>
    );
}

export default SeriesModal;