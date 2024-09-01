import {Grid2} from "@mui/material";
import {User} from "@/components/users-list/user/User";

interface UsersListInterface {
    users: Array<string>;
}

// export const UsersList = ({users}: UsersListInterface) => {
export const UsersList = ({users}) => {
// console.log('props',users)
    return (
        <Grid2 container alignItems={'center'} display={'flex'} textAlign={'center'} justifyContent={'center'}>
            {/*{['Цвцвц ВЦвцвц Вцвцв','DWdwd wdwdw DWdwdw'].map((user, idx) => (*/}
            {users?.map((user, idx) => (
                <Grid2 item key={String(idx)}>
                    <User user={user}/>
                </Grid2>
            ))}
        </Grid2>
    );
};

