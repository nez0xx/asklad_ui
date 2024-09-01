import React, {useCallback, useEffect, useState} from 'react';

import {Pagination as PaginationMUI} from "@mui/material";


const Pagination = ({setData, data}: { setData: (data) => void, data: Array<string | any> }) => {
    console.log('data leb',data?.length)
    const service = {
        getData: ({from, to}: any) => {
            return new Promise((resolve, reject) => {
                const result = data?.slice(from, to);
                resolve({
                    count: data?.length,
                    result,
                })
            })
        }
    }
    const pageSize = 6;
    const [pagination, setPagination] = useState({
        count: 0,
        form: 0,
        to: pageSize
    });
    useEffect(() => {
        service.getData({from: pagination.form, to: pagination.to}).then((response: any) => {
            setPagination({...pagination, count: response.count})
            setData(response.data)
        })
    }, [pagination.form, pagination.to])

    const wrapperHandlePage = useCallback(({page}: any) => {
        const from = (page - 1) * pageSize
        const to = (page - 1) * pageSize + pageSize
        setPagination({...pagination, form: from, to: to})
    }, [pagination])
    return (
        <>
            <PaginationMUI variant="outlined"
                           shape="rounded"
                           size={'large'}
                           count={Math.ceil(pagination.count / pageSize)}
                           color='secondary'
                           onChange={wrapperHandlePage}
            ></PaginationMUI>
        </>
    );
};

export default Pagination;