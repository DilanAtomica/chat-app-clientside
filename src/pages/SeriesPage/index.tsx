import React from 'react';
import "./index.css";
import Navbar from "../../components/Navbar";
import {useParams} from "react-router-dom";
import {useSeriesResult} from "./hooks/api";
import Button from "../../components/Form/Button";

function SeriesPage() {

    const {seriesID} = useParams();

    const {data} = useSeriesResult(seriesID);

    return (
        <main className="seriesPage">
            <Navbar />
            <div className="seriesContent">
                <img loading="lazy" src={data?.backdrop_path ? "https://image.tmdb.org/t/p/w500" + data.backdrop_path : "https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg"}
                     alt={data?.name} />
                <h1>{data?.name}</h1>
                <div className="seasons">
                    {data?.seasons.map((season: any) => (
                        season.name !== "Specials" && <Button key={season.id} buttonType={"button"} disabled={false} width={"max-content"}>{season.name}</Button>
                    ))}
                </div>
            </div>

        </main>
    );
}

export default SeriesPage;