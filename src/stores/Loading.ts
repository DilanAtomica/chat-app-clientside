import {create} from "zustand";

type useLoadingScreen = {
    showLoadingScreen: boolean,
    activateLoadingScreen: () => void,
    deActivateLoadingScreen: () => void,
}

export const useLoadingScreen = create<useLoadingScreen>((set) => ({
    showLoadingScreen: false,
    activateLoadingScreen: () => set(() => ({ showLoadingScreen: true })),
    deActivateLoadingScreen: () => set(() => ({ showLoadingScreen: false })),
}));

export default useLoadingScreen;
