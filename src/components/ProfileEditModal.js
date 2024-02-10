import React, { useState, useRef, useEffect } from 'react';
import { BACKEND_URL } from '../services/info';
import axios from "axios";

const ProfileEditModal = (props) => {

    const ref = useRef(null);
    const refClose = useRef(null);

    const [editedProfile, setEditedProfile] = useState({ name: '', dateOfBirth: '', occupation: '', bio: '', age: '', image: null});

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setEditedProfile({...editedProfile, [e.target.name]: e.target.files[0]});
        } else {
            setEditedProfile({...editedProfile, [e.target.name]: e.target.value });
        }
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
            formData.append('image', editedProfile.image);

            const response = await axios.put(
                `${BACKEND_URL}/editUserProfile`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'authToken': localStorage.getItem('token')
                    }
                }
            );

            if (response.data.success) {
                props.onClose();
                props.showAlert(response.data.msg, "success");
            } else {
                props.showAlert(response.data.msg, "danger");
            }
        } catch (error) {
            console.error(error);
            props.showAlert("An error occurred during updating user profile", "danger");
        }
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
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
                            <button onClick={handleOnClickCloseBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                    <div className="modal-body">

                        {/* Here, we are adding a form in which we are updating the user's profile or adding more details */}
                        <div className="container my-3">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <input type="file" className="form-control" id="image" name="image" onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={editedProfile.name} onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="occupation" className="form-label">Occupation</label>
                                    <input type="text" className="form-control" id="occupation" name="occupation" value={editedProfile.occupation} onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                                    <input type="date" className="form-control" id="dateOfBirth" name="dateOfBirth" value={editedProfile.dateOfBirth} onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label">Age</label>
                                    <input type="number" className="form-control" id="age" name="age" value={editedProfile.age} onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bio" className="form-label">Bio</label>
                                    <textarea className="form-control" id="bio" name="bio" value={editedProfile.bio} onChange={handleChange}/>
                                </div>
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

export default ProfileEditModal;
