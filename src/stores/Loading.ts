import {create} from "zustand";

type useLoadingScreen = {
    showLoadingScreen: boolean,
}

export const useLoadingScreen = create<useLoadingScreen>((set) => ({
    showLoadingScreen: false,
    activateLoadingScreen: () => set(() => ({ showLoadingScreen: true })),
    deActivateLoadingScreen: () => set(() => ({ showLoadingScreen: false })),
}));

export default useLoadingScreen;
