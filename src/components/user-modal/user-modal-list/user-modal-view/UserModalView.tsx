import React from 'react';
import {Typography} from "@mui/material";

export const UserModalView =  ({user}: string) =>
    <Typography id="modal-modal-title" variant="h6" component="h2">
        <span>{user}</span>
    </Typography>