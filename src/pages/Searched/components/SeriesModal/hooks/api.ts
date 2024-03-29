import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";

const seriesResult = async(seriesID: number | null) => {
    try {
        const seriesResultData = await axios.get(import.meta.env.VITE_REACT_API_URL + "/shows/seriesResult", {
            withCredentials: true,
            params: {
                seriesID: seriesID,
            }
        });
        console.log(seriesResultData.data);
        return seriesResultData.data;
    } catch(error) {
        console.log(error);
    }

}
export const useSeriesResult = (seriesID: number | null) => {
    return useQuery(["seriesResultData"], () => seriesResult(seriesID));
}

type chatQueueInputs = {
    seriesID: number,
    season: number,
    episode: number,
};

const chatQueue = (inputData: chatQueueInputs) => {
    return axios.post( import.meta.env.VITE_REACT_API_URL +'/chats/chatQueue', inputData, {withCredentials: true});
};

export const useChatQueue = () => {
    return useMutation(["chatQueueMutation"], (inputData: chatQueueInputs) => chatQueue(inputData));
}




