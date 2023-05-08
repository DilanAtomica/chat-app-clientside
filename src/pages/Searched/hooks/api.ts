import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const searchResult = async(searchWord: string | undefined, page: string | undefined) => {
        const searchResultData = await axios.get(import.meta.env.VITE_REACT_API_URL + "/shows/searchResult", {
            withCredentials: true,
            params: {
                searchWord: searchWord,
                page: page,
            }
        });
        console.log(searchResultData.data);
        return searchResultData.data;
}
export const useSearchResult = (searchWord: string | undefined, page: string | undefined) => {
    return useQuery(["searchResultData"], () => searchResult(searchWord, page));
}

