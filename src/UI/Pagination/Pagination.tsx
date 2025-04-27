import { Icon } from "@iconify/react";
import React from "react";
import cls from './Pagination.module.css';

export default function Pagination({ totalPages, nextPage, previousPage, currentPage, setPage }) {
    return (
        <div className={cls.main}>
            {currentPage > 1 && (
                <Icon
                    className={cls.arrow}
                    icon="material-symbols:arrow-back-rounded"
                    width="24"
                    height="24"
                    onClick={previousPage}
                />
            )}

            <div className={currentPage === 1 ? cls.current : undefined}>
                <span onClick={() => setPage(1)}>1</span>
            </div>

            {totalPages > 1 && (
                <React.Fragment>
                    {currentPage > 2 && (
                        <div>
                            <span onClick={() => setPage(currentPage - 1)}>{currentPage - 1}</span>
                        </div>
                    )}

                    {currentPage !== 1 && currentPage !== totalPages && (
                        <div className={cls.current}>
                            <span>{currentPage}</span>
                        </div>
                    )}

                    {currentPage < totalPages && currentPage + 1 !== totalPages && (
                        <div>
                            <span onClick={() => setPage(currentPage + 1)}>{currentPage + 1}</span>
                        </div>
                    )}

                    {totalPages > 4 && <span className={cls.dots}>...</span>}

                    <div className={currentPage === totalPages ? cls.current : undefined}>
                        <span onClick={() => setPage(totalPages)}>{totalPages}</span>
                    </div>
                </React.Fragment>
            )}

            {currentPage < totalPages && (
                <Icon
                    className={cls.arrow}
                    icon="material-symbols:arrow-forward-rounded"
                    width="24"
                    height="24"
                    onClick={nextPage}
                />
            )}
        </div>
    );
}
