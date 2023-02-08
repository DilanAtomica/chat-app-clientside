import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const seriesResult = async(seriesID: string | undefined) => {
    try {
        const seriesResultData = await axios.post("http://localhost:3001/shows/seriesResult",{seriesID}, {
            withCredentials: true
        });
        console.log(seriesResultData.data);
        return seriesResultData.data;
    } catch(error) {
        console.log(error);
    }

}
export const useSeriesResult = (seriesID: string | undefined) => {
    return useQuery(["seriesResultData"], () => seriesResult(seriesID));
}




