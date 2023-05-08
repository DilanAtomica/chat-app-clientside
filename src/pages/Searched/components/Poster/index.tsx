import React from 'react';
import "./index.css";
import useSeriesModal from "../../../../stores/SeriesModal"
import {addImageFallbackPoster} from "../../../../utils/imageFallBack";

type posterProps = {
    id: number,
    name: string,
    poster: string,
};


function Poster({name, poster, id}: posterProps) {

    const seriesModal = useSeriesModal();

    const handleOnClick = () => {
        seriesModal.setSeriesID(id);
        seriesModal.activateSeriesModal();
    }

    return (
        <li onClick={handleOnClick} className="poster">
                <img loading="lazy" onError={addImageFallbackPoster} src={"https://image.tmdb.org/t/p/w500" + poster}
                     alt={name} />
                <h1 role="posterName">{name}</h1>
        </li>
    );
}

export default Poster;