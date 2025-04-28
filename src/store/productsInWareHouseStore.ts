import { getPaginationPage } from "@/utils/getPaginationPage";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IStore {
    data: [],
    currentPage: number,
    totalPages: number,
    size: number,
    page: [],
    nextPage: () => void,
    previousPage: () => void,
    setPage: (page: number) => void
    setData: (data: [], count: number) => void
}

const useProductsInWareHouse = create<IStore>()(
  devtools(
    immer((set, get) => ({
      data: [],
      currentPage: 1,
      totalPages: 1,
      size: 5,
      page: [],
      nextPage: () => {
        if(get().currentPage < get().totalPages) {
            set({currentPage: get().currentPage + 1})
            set({page: getPaginationPage(get().currentPage, get().data, get().size)})
        }
      },
      previousPage: () => {
        if(get().currentPage > 1) {
            set({currentPage: get().currentPage - 1})
            set({page: getPaginationPage(get().currentPage, get().data, get().size)})
        }
      },
      setPage: (page) => {
        if(page >= 1 && page <= get().totalPages) {
            set({currentPage: page})
        }
      },
      setData: (data, count) => {
        set({data})
        set({totalPages: Math.ceil(count / get().size)})
      },
    }))
  )
);

export default useProductsInWareHouse;