import {Grid2, List} from "@mui/material";
import {UserModalView} from "@/components/user-modal/user-modal-list/user-modal-view/UserModalView";


interface UsersListInterface {
    users: Array<string>;
}
const style = {
    py: 0.5,
    px: 0.5,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '0.2px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
};

export const UserModalList = ({users}: UsersListInterface) => {
    return (
        <Grid2 container alignItems={'center'} display={'flex'} textAlign={'center'} justifyContent={'center'}>
            {users?.map((user, idx) => (
                <Grid2 item key={String(idx)}>
                   <List sx={style}>
                       <UserModalView user={user}/>
                   </List>
                </Grid2>
            ))}
        </Grid2>
    );
};
