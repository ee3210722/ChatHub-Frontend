import React, { useState, useRef, useEffect } from 'react';
import { BACKEND_URL } from '../../services/info';
import { useToast } from '@chakra-ui/react'
import UserListItem from './UserListItem';

const GroupChatModal = (props) => {

    const ref = useRef(null);
    const refClose = useRef(null);

    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
          return;
        }

        try {
            setLoading(true);
            const response  = await fetch(`${BACKEND_URL}/api/user/fetchAllUsers?search=${search}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            console.log(data);
            setLoading(false);
            setSearchResult(data);
            } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
          toast({
            title: "User already added",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.onClose();
    };



    const handleOnClickCloseBtn = (e) => {
        e.preventDefault();
        props.onClose();
    };

    useEffect(() => {
        if (props.isOpen) ref.current.click();   // Automatically open the modal
        else  refClose.current.click();    // Automatically close the modal
    }, [props.isOpen]);

    return (
      <>
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch Profile Edit modal</button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Create New Group </h1>
                        <button onClick={handleOnClickCloseBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="container my-3">
                            <form className="my-3">
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter Group Name"value={groupChatName} onChange={(e) => setGroupChatName(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="occupation" name="occupation" placeholder="Add Users eg: John, Piyush, Jane" value={groupChatName} onChange={(e) => handleSearch(e.target.value)}/>
                                </div>
                                {loading ? (
                                    // <ChatLoading />
                                    <div>Loading...</div>
                                    ) : (
                                    searchResult
                                        ?.slice(0, 4)
                                        .map((user) => (
                                        <UserListItem
                                            key={user._id}
                                            user={user}
                                            handleFunction={() => handleGroup(user)}
                                        />
                                        ))
                                    )
                                }
                            </form>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button ref={refClose} onClick={handleOnClickCloseBtn} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleSubmit} type="button" className="btn btn-primary">Save Changes</button>
                    </div>

                </div>
            </div>
        </div>
    </>
  );
};

export default GroupChatModal;
