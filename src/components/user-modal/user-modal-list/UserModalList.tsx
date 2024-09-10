import {Grid2} from "@mui/material";
import {UserModalView} from "@/components/user-modal/user-modal-list/user-modal-view/UserModalView";


interface UsersListInterface {
    users: Array<string>;
}

export const UserModalList = ({users}) => {
// console.log('props',users)
    return (
        <Grid2 container alignItems={'center'} display={'flex'} textAlign={'center'} justifyContent={'center'}>
            {/*{['Цвцвц ВЦвцвц Вцвцв','DWdwd wdwdw DWdwdw'].map((user, idx) => (*/}
            {users?.map((user, idx) => (
                <Grid2 item key={String(idx)}>
                    <UserModalView user={user}/>
                </Grid2>
            ))}
        </Grid2>
    );
};
