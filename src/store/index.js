import { create } from 'zustand'

export const useStore = create((set) => ({
	user: null,
	isAuth: false,
	setIsAuth: (isAuth) => set(() => ({ isAuth })),
	setUser: (user) => set(() => ({ user })),
}))
