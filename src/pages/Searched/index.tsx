import React, {useState} from 'react';
import "./index.css";
import Navbar from "../../components/Navbar";
import {useNavigate, useParams} from "react-router-dom";
import {useSearchResult} from "./hooks/api";
import SearchInput from "../../components/Form/SearchInput";
import Button from "../../components/Form/Button";
import Poster from "./components/Poster";
import LoadingScreen from "../../components/LoadingScreen";

function SearchedPage() {

    const {searchWord, page} = useParams();
    const {data, isFetching} = useSearchResult(searchWord, page);
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState("");

    const onSubmit = () => {
        navigate("/search/" + inputValue + "/" + 1);
    };

    const getPages = () => {
        if(page) {
            const currentPage = parseInt(page);
            let pages: number[] = [currentPage - 12, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, + currentPage +3];

            pages = pages.filter(page => page > 0);
            pages = pages.filter(page => page < data?.total_pages);

            //if(pages[0] !== currentPage) pages.unshift("Prev");
            //if(pages[pages.length + 1] !== data?.total_pages) pages.push("Next");
            console.log(pages);
            return pages;
        }
    };

    const pages = getPages()

    return (
        <main className="searchedPage">
            {isFetching && <LoadingScreen />}
            <Navbar />

            <form onSubmit={onSubmit} className="searchedPage-top">
                <h1>Search for your favorite shows</h1>
                <SearchInput setInputValue={setInputValue} />
                <Button width={"100%"} buttonType={"submit"} disabled={false}>Search</Button>
            </form>

            <div className="pagination">
                {pages && page && parseInt(page) !== 1 && <div className="backForthBtn">Prev</div>}
                {pages && pages.map(page => (
                    <div key={page} className="pageNumber">{page}</div>
                ))}
                {pages && page && parseInt(page) !== data?.total_pages && <div className="backForthBtn">Next</div>}
            </div>


            <div className="movies">
                {data?.results.map((movie: any) => (
                    <Poster key={movie.id} id={movie.id} poster={movie.poster_path} name={movie.name} />
                ))}
            </div>
        </main>
    );
}

export default SearchedPage;