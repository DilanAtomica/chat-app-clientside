import React from 'react';
import "./index.css";

type posterProps = {
    id: number,
    name: string,
    poster: string,
}

function Poster({name, poster, id}: posterProps) {
    return (
        <div className="poster">
            <img src={poster && "https://image.tmdb.org/t/p/w500" + poster} alt="Movie Poster" />
            <h1>{name}</h1>
        </div>
    );
}

export default Poster;