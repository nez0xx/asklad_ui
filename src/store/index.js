import { create } from 'zustand';

export const useStore = create((set) => ({
	user: {},
	isAuth: false,
	setIsAuth: (isAuth) => set(() => ({ isAuth })),
}));
