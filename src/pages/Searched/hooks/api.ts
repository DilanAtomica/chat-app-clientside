import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const searchResult = async(searchWord: string | undefined, page: string | undefined) => {
        const searchResultData = await axios.post(process.env.API_URL + "/shows/searchResult",{searchWord, page}, {
            withCredentials: true
        });
        console.log(searchResultData.data);
        return searchResultData.data;
}
export const useSearchResult = (searchWord: string | undefined, page: string | undefined) => {
    return useQuery(["searchResultData"], () => searchResult(searchWord, page));
}

