import { Button, Dialog, DialogActions, DialogContent,DialogTitle,IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from 'react';
import { BACKEND_URL } from '../../services/info';
import { UserState } from "../../Context/UserProvider";

const UserProfileEditModal = (props) => {

    const { user, setUser } = UserState();


    const [editedProfile, setEditedProfile] = useState({ name: '', dateOfBirth: '', occupation: '', bio: '', age:'' });

    const handleChange = (e) => {
        setEditedProfile({...editedProfile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', editedProfile.name);
            formData.append('dateOfBirth', editedProfile.dateOfBirth);
            formData.append('age', editedProfile.age);
            formData.append('occupation', editedProfile.occupation);
            formData.append('bio', editedProfile.bio);

            const response = await fetch(`${BACKEND_URL}/api/user/editUserProfile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.success) {
                    setUser(responseData.updatedUser);
                    console.log(responseData.msg);
                    props.onClose();
                }
            } else {
                console.log("An error occurred during updating user profile");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnClickCloseBtn = (e) => {
        e.preventDefault();
        props.onClose();
    };

    return (
        <Dialog open={props.isOpen} onClose={props.onClose} fullWidth maxWidth="sm">
            <DialogTitle style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                Edit User profile
                <IconButton onClick={props.onClose} style={{ float: 'right' }}>
                    <CloseIcon color="primary" />
                </IconButton>
                <hr style={{ margin: '10px 0', border: '0', borderBottom: '2px solid #ccc' }} />
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} margin={2}>
                    <TextField variant="outlined" label="name" name="name" value={editedProfile.name} onChange={(e) => handleChange(e)}></TextField>
                    <TextField variant="outlined" label="occupation" name="occupation" value={editedProfile.occupation} onChange={(e) => handleChange(e)}></TextField>
                    <TextField variant="outlined" name="dateOfBirth" value={editedProfile.dateOfBirth} type="date" onChange={(e) => handleChange(e)}></TextField>
                    <TextField variant="outlined" label="age" name="age" value={editedProfile.age} type="number" onChange={(e) => handleChange(e)}></TextField>
                    <TextField variant="outlined" label="bio" name="bio" value={editedProfile.bio} onChange={(e) => handleChange(e)}></TextField>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} color="success" variant="contained">Edit</Button>
                <Button onClick={handleOnClickCloseBtn} color="error" variant="contained">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserProfileEditModal;