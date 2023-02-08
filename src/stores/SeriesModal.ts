import {create} from "zustand";

type useSeriesModalTypes = {
    showSeriesModal: boolean,
    seriesID: number | null,
    setSeriesID: (seriesID: number) => void,
    activateSeriesModal: () => void,
    deActivateSeriesModal: () => void,

}

export const useSeriesModal = create<useSeriesModalTypes>((set) => ({
    showSeriesModal: false,
    seriesID: null,
    setSeriesID: (seriesID: number) => set(() => ({ seriesID: seriesID })),
    activateSeriesModal: () => set(() => ({ showSeriesModal: true })),
    deActivateSeriesModal: () => set(() => ({ showSeriesModal: false })),
}));

export default useSeriesModal;
