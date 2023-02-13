import {create} from "zustand";

type useScreenWidth = {
    width: number,
}

export const useScreenWidth = create<useScreenWidth>((set) => ({
    width: 0,
    changeWidth: (newWidth: number) => set(() => ({width : newWidth})),
}));

export default useScreenWidth;
