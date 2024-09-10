import {Typography} from "@mui/material";

export const User = ({user}: string) =>
    <Typography id="modal-modal-title" variant="h6" component="h2">
        <span>{user}</span>
    </Typography>
