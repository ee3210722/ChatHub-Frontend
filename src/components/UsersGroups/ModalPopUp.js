import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@chakra-ui/react";
import UserListItem from './UserListItem';
import UserBadgeItem from './UserBadgeItem';
import { BACKEND_URL } from "../../services/info";

const Modalpopup = (props) => {

    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState();
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        try {
            setLoading(true);
            const response  = await fetch(`${BACKEND_URL}/api/user/searchForUsers?search=${search}`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            setLoading(false);
            setSearchResult(data);
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
          return;
        }
        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!groupChatName || !selectedUsers) {
            return;
        }
        try {
            const selUsers = selectedUsers.map(user => user._id);
            // eslint-disable-next-line
            const response = await fetch(`${BACKEND_URL}/api/chat/createGroup`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: groupChatName,
                    users:  selUsers
                }),
            });
            props.onClose();
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnClickCloseBtn = () => {
        props.onClose();
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };

    return (
        <Dialog open={props.isOpen} onClose={props.onClose} fullWidth maxWidth="sm">
            <DialogTitle style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                Create New Group
                <IconButton onClick={props.onClose} style={{ float: 'right' }}>
                    <CloseIcon color="primary" />
                </IconButton>
                <hr style={{ margin: '10px 0', border: '0', borderBottom: '2px solid #ccc' }} />
            </DialogTitle>
            <DialogContent style={{ marginBottom: '1px', marginTop: '5px' }}>
                <Stack spacing={2} margin={2}>
                    <TextField variant="outlined" label="Enter Group Name" value={groupChatName} onChange={(e) => setGroupChatName(e.target.value)}/>
                    <TextField variant="outlined" label="Add Users eg: Ram, Lakhan, Bharat" value={search} onChange={(e) => handleSearch(e)}/>

                    <Box w="100%" d="flex" flexWrap="wrap">
                        {selectedUsers.map((user) => (
                            <UserBadgeItem key={user._id} user={user} handleRemoval={() => handleDelete(user)}/>
                        ))}
                    </Box>

                    {loading ? (
                        <div>Loading...</div>
                        ) : (
                        searchResult
                            ?.slice(0, 4)
                            .map((user) => (
                            <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)}/>
                            ))
                        )
                    }
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} color="success" variant="contained">Create</Button>
                <Button onClick={handleOnClickCloseBtn} color="error" variant="contained">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Modalpopup;
