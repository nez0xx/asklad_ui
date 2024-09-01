import {Box, Button, Grid2, Modal as ModalMUI} from "@mui/material";
import {useState} from "react";
import {UsersList} from "@/components/users-list/UsersList";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: `2px solid #00b6f0`,
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
};

export const Modal = ({data}: Array<string>)=> {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<Array<string>>(['Цвцвц ВЦвцвц Вцвцв','DWdwd wdwdw DWdwdw','DWdwd wdwdw DWdwdw','DWdwd wdwdw DWdwdw','DWdwd wdwdw DWdwdw','DWdwd wdwdw DWdwdw','DWdwd wdwdw DWdwdw','DWdwd wdwdw DWdwdw']);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // console.log('users',usersWW)
    // useEffect(() => {
    //     setOpen(true)
    //     setUsers(data)
    //     console.log(data,'DATA IN MODAL')
    // },[data])

    // useEffect(() => {},[data])
    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <ModalMUI
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid2 item>
                    <Box sx={style}>
                        <Grid2 container display={'flex'} direction={'row'}>
                            {/*<Grid2 item>*/}
                                {/*<Typography id="modal-modal-title" variant="h6" component="h2">*/}
                                {/*    Text in a modal*/}
                                {/*</Typography>*/}
                                {/*<Typography id="modal-modal-description" sx={{mt: 2}}>*/}
                                {/*    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.*/}
                                {/*</Typography>*/}
                                <Grid2 item><UsersList users={users} /></Grid2>

                            {/*</Grid2>*/}

                                <Grid2 item>

                                    {/*<Pagination setData={(user) => setUsers(user)} data={users}/>*/}
                                </Grid2>
                        </Grid2>
                    </Box>
                </Grid2>
            </ModalMUI>
        </div>
    );
};

