import React from 'react';
import "./index.css";
import Navbar from "../../components/Navbar";
import {useParams} from "react-router-dom";

function SearchedPage() {

    const {searchWord} = useParams();

    return (
        <main className="searchedPage">
            <h1>{searchWord}</h1>
            <Navbar />
        </main>
    );
}

export default SearchedPage;