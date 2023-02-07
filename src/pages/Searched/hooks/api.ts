import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const searchResult = async(searchWord: string) => {
    try {
        const searchResultData = await axios.post("http://localhost:3001/movies/searchResult",{searchWord}, {
            withCredentials: true
        });
        console.log(searchResultData);
        return searchResultData;
    } catch(error) {
        console.log(error);
    }

}
export const useSearchResult = (searchWord: string) => {
    return useQuery(["searchResultData"], () => searchResult(searchWord));
}




