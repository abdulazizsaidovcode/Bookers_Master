import { create } from "zustand";

export interface IState {
    allowClient: boolean
    setAllowClient: (val: boolean) => void
    isEnabled: boolean
    setIsEnabled: (val: boolean) => void
    isEnabled2: boolean
    setIsEnabled2: (val: boolean) => void
    isEnabled3: boolean
    setIsEnabled3: (val: boolean) => void
}
export interface Urgently {
    Urgently: boolean
    setUrgentlyt: (val: boolean) => void
}

export const OnlineBookingStory = create<IState>((set) => ({
    allowClient: false,
    setAllowClient: (val: boolean) => set({ allowClient: val }),
    isEnabled: false,
    setIsEnabled: (val: boolean) => set({ isEnabled: val }),
    isEnabled2: true,
    setIsEnabled2: (val: boolean) => set({ isEnabled2: val }),
    isEnabled3: true,
    setIsEnabled3: (val: boolean) => set({ isEnabled3: val }),
}));

export const OnlineBookingSettingsUrgentlyStory = create<Urgently>((set) => ({
    Urgently: false,
    setUrgentlyt: (val: boolean) => set({ Urgently: val }),
}));

;