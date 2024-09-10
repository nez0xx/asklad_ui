import {Box, Grid2, Modal as ModalMUI, Pagination} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {UserModalList} from "./user-modal-list/UserModalList";
import {SecondaryButton} from "@UI/Button-Mui/Button-Mui";
import {Icon} from "@/components/icon/Icon";
import {toast} from "react-toastify";
import {style} from "@/components/user-modal/UserModal.style";


export const UserModal = ({data}: any) => {
    const itemsPerPage = 10;
    const [modalOpen, setModalOpen] = useState(true);
    const [users, setUsers] = useState<Array<string> | []>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handleClose = () => setModalOpen(false);

    useEffect(() => {
        setModalOpen(true)
        setUsers(data)
    }, [data])
    const handleCopyClick = useCallback(() => {
        navigator.clipboard.writeText(data?.join(', '))
            .then(() => {
                toast.success('Учасники скопированы', {
                    autoClose: 1420,
                })
            })
            .catch(_ => {
                toast.error('Ошибка при копировании текста', {
                    autoClose: 1420,
                })
            });
    }, [users.length])
    const currentData = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const handlePageChange = useCallback((event, page) => {
        setCurrentPage(page);
    }, [event])
    return (
        <>
            <ModalMUI
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid2 item>
                    <Box sx={style}>
                        <Grid2 container display={'flex'} direction={'row'}>
                            <Grid2 container display={'flex'} width justifyContent={'space-between'} pb={2}
                                   alignItems={'center'}>
                                <Grid2 item><SecondaryButton color={'primary'}
                                                             variant="contained"
                                                             onClick={handleClose}>Закрыть</SecondaryButton></Grid2>
                                <Grid2 item>
                                    <SecondaryButton color={'primary'}
                                                     variant="contained"
                                                     onClick={handleCopyClick}>
                                        <Box pt={1}>
                                            <Icon type={'Link'}/>
                                        </Box>
                                    </SecondaryButton>
                                </Grid2>
                            </Grid2>
                            <Grid2 item><UserModalList users={currentData}/></Grid2>
                            <Grid2 container width display={'flex'} alignItems={'center'} pt={2}>
                                <Pagination
                                    width
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
                            </Grid2>
                        </Grid2>
                    </Box>
                </Grid2>
            </ModalMUI>
        </>
    );
}


