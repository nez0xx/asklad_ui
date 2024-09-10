import {ListItemText, Typography} from "@mui/material";

export const UserModalView = ({user}: string) =>
    <Typography id="modal-modal-title" component="h6">
        <ListItemText primary={user}/>
    </Typography>
