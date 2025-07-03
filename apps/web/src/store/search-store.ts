import { create } from "zustand";
import { DateRange } from "../components/date-range-picker";
import { persist } from "zustand/middleware";

interface RoomGuest {
  rooms: number;
  guests: number;
}

interface SearchState {
  mode: "location" | "date" | "room-guest" | undefined;
  selectedLocation: string;
  selectedDate: DateRange;
  selectedRoomGuest: RoomGuest;
}

interface SearchAction {
  setMode: (value: SearchState["mode"]) => void;
  setSelectedLocation: (value: string) => void;
  setSelectedDate: (value: DateRange) => void;
  setSelectedRoomGuest: (value: RoomGuest) => void;
  resetSearch: () => void;
}

const initSearchState: SearchState = {
  mode: undefined,
  selectedLocation: "",
  selectedDate: {
    start: new Date(),
    end: new Date(),
  },
  selectedRoomGuest: {
    rooms: 1,
    guests: 1,
  },
};

const useSearchStore = create<SearchState & SearchAction>()(
  persist(
    (set) => ({
      ...initSearchState,
      setMode: (value: SearchState["mode"]) => set({ mode: value }),
      setSelectedLocation: (value: string) => set({ selectedLocation: value }),
      setSelectedDate: (value: DateRange) => set({ selectedDate: value }),
      setSelectedRoomGuest: (value: RoomGuest) =>
        set({ selectedRoomGuest: {guests: value.guests, rooms: value.rooms} }),
      resetSearch: () => set(initSearchState),
    }),
    {
      name: "search-bookhotel-storage",
    }
  )
);

export default useSearchStore;
