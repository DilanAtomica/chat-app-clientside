import React, {useEffect, useState} from 'react';
import "./index.css";
import {RxCross1} from "react-icons/rx";
import {useSeriesResult} from "./hooks/api"
import useSeriesModal from "../../../../stores/SeriesModal";
import Button from "../../../../components/Form/Button";
import LoadingScreen from "../../../../components/LoadingScreen";

function SeriesModal() {

    const seriesModal = useSeriesModal();
    const {data, isFetching} = useSeriesResult(seriesModal.seriesID);

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
        console.log("Useeffect: Series Modal")
        setEpisodes(episodeList);
    }, [season, data]);

    const onBackgroundClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target instanceof HTMLElement) {
            if(e.target.classList.contains("seriesModalContainer")) seriesModal.deActivateSeriesModal();
        }
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
                    <div className="seasons">
                        {data?.seasons.map((season: any) => (
                            season.name !== "Specials" &&
                            <Button setSeason={setSeason} seasonNumber={season.season_number} key={season.id}
                                    buttonType={"button"} disabled={false} width={"max-content"}>{season.name}</Button>
                        ))}
                    </div>
                    <h2>Episodes</h2>
                    <div className="episodes">
                        {episodes?.map((episode: any) => (
                            <Button key={episode}
                                    buttonType={"button"} disabled={false} width={"max-content"}>{episode}</Button>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SeriesModal;