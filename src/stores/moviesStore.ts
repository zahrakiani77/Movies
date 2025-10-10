import { create } from "zustand";

type MoviesState = {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	clearSearch: () => void;
};

export const useMoviesStore = create<MoviesState>((set) => ({
	searchTerm: "",
	setSearchTerm: (term) => set({ searchTerm: term }),
	clearSearch: () => set({ searchTerm: "" }),
}));
