import React, {useEffect, useState} from 'react';
import "./index.css";
import Navbar from "../../components/Navbar";
import {useNavigate, useParams} from "react-router-dom";
import {useSearchResult} from "./hooks/api";
import SearchInput from "../../components/Form/SearchInput";
import Button from "../../components/Form/Button";
import Poster from "./components/Poster";
import LoadingScreen from "../../components/LoadingScreen";
import SeriesModal from "./components/SeriesModal";
import useSeriesModal from "../../stores/SeriesModal";

function SearchedPage() {

    const {searchWord, page} = useParams();
    const {data, isFetching} = useSearchResult(searchWord, page);
    const navigate = useNavigate();

    const seriesModal = useSeriesModal();

    const [inputValue, setInputValue] = useState("");
    const [pages, setPages] = useState<number[] | null>(null);

    const onSubmit = () => {
        navigate("/search/" + inputValue + "/" + 1);
    };

    useEffect(() => {
        if(page) {
            const currentPage = parseInt(page);
            let pages: number[] = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, + currentPage +3];
            pages = pages.filter(page => page > 0);
            pages = pages.filter(page => page <= data?.total_pages);
            setPages(pages);
            console.log("Useffect: SearchedPage");
        }
    }, [data]);

    const onPageClick = (e: React.MouseEvent<HTMLElement>) => {
        const pageNumber = e.currentTarget.innerHTML;
        navigate("/search/" + searchWord + "/" + pageNumber);
        window.location.reload();
    };

    const onNextPrevClick = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e.currentTarget.id);
        if(page) {
            if(e.currentTarget.id === "prevBtn"){
                navigate("/search/" + searchWord + "/" + (parseInt(page) - 1));
                window.location.reload();
            }
            else if(e.currentTarget.id === "nextBtn") {
                navigate("/search/" + searchWord + "/" + (parseInt(page) + 1));
                window.location.reload();
            }
        }
    }

    return (
        <main className="searchedPage">
            {isFetching && <LoadingScreen />}
            <Navbar />
            {seriesModal.showSeriesModal && <SeriesModal />}

            <form onSubmit={onSubmit} className="searchedPage-top">
                <h1>Search for your favorite shows</h1>
                <SearchInput setInputValue={setInputValue} />
                <Button width={"100%"} buttonType={"submit"} disabled={false}>Search</Button>
            </form>

            <ul className="pagination">
                {pages && page && parseInt(page) !== 1 &&
                    <li><button onClick={onNextPrevClick} type="button" id="prevBtn" className="backForthBtn">Prev</button></li>}

                {pages && pages.map(pageIndex => (
                    <li key={pageIndex}><button onClick={onPageClick} style={{backgroundColor: page && pageIndex === parseInt(page) ? "black" : "#0F62FE"}}
                                type="button" className="pageNumber">{pageIndex}</button></li>

                ))}
                {pages && page && parseInt(page) !== data?.total_pages &&
                    <li><button onClick={onNextPrevClick} id="nextBtn" type="button" className="backForthBtn">Next</button></li>}
            </ul>


            <ul className="movies">
                {data?.results.map((movie: { id: number, poster: string, name: string, poster_path: string }) => (
                    <Poster key={movie.id} id={movie.id} poster={movie.poster_path} name={movie.name} />
                ))}
            </ul>
        </main>
    );
}

export default SearchedPage;