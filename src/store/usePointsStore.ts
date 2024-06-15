import { create } from 'zustand';

interface PointsState {
    chips: number
    points: number
    initPoints: (value: { chips: number, points: number }) => void
    addChips: (value: number) => void
    addPoints: (value: number) => void
    subtractChips: (value: number) => void
    subtractPoints: (value: number) => void
}

const usePointsStore = create<PointsState>()((set) => ({
    chips: 0,
    points: 0,
    initPoints: ({ chips, points }) => set(() => ({ chips, points })),
    addChips: (amount) => set((state) => ({ chips: state.chips + amount })),
    addPoints: (amount) => set((state) => ({ points: state.points + amount })),
    subtractChips: (amount) => set((state) => ({ chips: state.chips - amount })),
    subtractPoints: (amount) => set((state) => ({ points: state.points - amount })),
}));

export default usePointsStore;
