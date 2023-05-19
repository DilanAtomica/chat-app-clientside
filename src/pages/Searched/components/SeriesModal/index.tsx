import React, {useEffect, useState} from 'react';
import "./index.css";
import {RxCross1} from "react-icons/rx";
import {useChatQueue, useSeriesResult} from "./hooks/api"
import useSeriesModal from "../../../../stores/SeriesModal";
import Button from "../../../../components/Form/Button";
import LoadingScreen from "../../../../components/LoadingScreen";
import {GoAlert} from "react-icons/go";
import {useNavigate} from "react-router-dom";

type seasonsType = {
    name: string,
    season_number: number,
}

function SeriesModal() {

    const navigate = useNavigate();
    const seriesModal = useSeriesModal();
    const {mutateAsync: queueSeries, isError, error} = useChatQueue();
    const {data, isFetching} = useSeriesResult(seriesModal.seriesID);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const [season, setSeason] = useState<number | null>(null);
    const [episodeInput, setEpisodeInput] = useState<string | null>(null);
    const [episodes, setEpisodes] = useState<number[] | null>(null);

    useEffect(() => {
        // @ts-ignore
        setErrorMsg(error?.response.data.message);
    }, [isError])

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

    const handleOnSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if((season && episodeInput))  {
                const test = await queueSeries({seriesID: data?.id, season: season, episode: parseInt(episodeInput)});
                seriesModal.deActivateSeriesModal();
                console.log(test.data.chatCreated);
                if(test.data.chatCreated) navigate("/chat");
                else navigate("/profile");
            }
        } catch(error: any) {
            console.log(error)
        }
    };

    return (
        <div onClick={onBackgroundClick} className="seriesModalContainer">
            {isFetching && <LoadingScreen />}
            <div className="seriesModal">
                <header>
                    <button onClick={() => seriesModal.deActivateSeriesModal()} type="button"><RxCross1 id="exitIcon" /></button>
                    <h1 role="postModalHeader">{data?.name}</h1>
                </header>

                <div className="seriesContent">
                    <img role="seriesModalImg" src={data?.backdrop_path ? "https://image.tmdb.org/t/p/w500" + data.backdrop_path : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png"}
                         alt={data?.name} />

                    <form onSubmit={handleOnSubmit}>
                        <label htmlFor="episodes">Choose a season:</label>
                        <select role="seasonSelect" defaultValue={"Season"} onChange={(e) => setSeason(parseInt(e.target.value))}
                                name="seasons" id="seasons">
                            <option value="Season" disabled={true}>Season</option>
                            {data?.seasons.map((season: seasonsType) => (
                                season.name !== "Specials" &&
                                <option role="seasonOption" value={season.season_number}>Season {season.season_number}</option>
                            ))}
                        </select>

                        <label htmlFor="episodes">Choose an episode:</label>
                        <select defaultValue={"Episode"} disabled={season === null} onChange={(e) => setEpisodeInput(e.target.value)} name="episodes" id="episodes">
                            <option value="Episode" disabled={true}>Episode</option>
                            {episodes?.map((episode: number) => (
                            <option role="episodeOption" value={episode}>Episode {episode}</option>
                            ))}
                        </select>

                        {isError &&
                        <div className="errorMsgContainer">
                            <p className="errorMsg"><GoAlert id="alertIcon" />{errorMsg}</p>
                        </div>}

                        <Button buttonType={"submit"} disabled={(!season || !episodeInput)} width={"max-content"}>Find a chatter</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SeriesModal;