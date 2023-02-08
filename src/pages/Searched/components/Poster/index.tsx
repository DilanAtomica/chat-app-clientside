import React from 'react';
import "./index.css";

type posterProps = {
    id: number,
    name: string,
    poster: string,
};


function Poster({name, poster, id}: posterProps) {
    return (
        <li className="poster">
            <a href={"/series/" + id}>
                <img loading="lazy" src={poster ? "https://image.tmdb.org/t/p/w500" + poster : "https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg"}
                     alt={name} />
                <h1>{name}</h1></a>
        </li>
    );
}

export default Poster;