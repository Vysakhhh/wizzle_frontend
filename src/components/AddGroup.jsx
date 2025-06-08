import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { UserRoundPlus } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';



function AddGroup() {

    const { users, getUsers, createGroup } = useChatStore()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        getUsers()
    }, [getUsers])

    const [formData, setFormData] = useState({
        groupName: "",
        members: [],
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            groupName: e.target.value,
        });
    };

    const handleCheckboxChange = (userId) => {
        setFormData((prev) => {
            const alreadySelected = prev.members.includes(userId);
            return {
                ...prev,
                members: alreadySelected
                    ? prev.members.filter((id) => id !== userId)
                    : [...prev.members, userId],
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { groupName, members } = formData


        if (groupName && members) {

            await createGroup(formData)
            setFormData({
                groupName: "",
                members: [],
            });

            handleClose()

        }
        else {
            toast.error("please fill the form!!")

        }


    }
    return (
        <>


            <button onClick={handleShow} className='flex gap-2 btn btn-sm items-center cursor-pointer transition-colors' >
                <UserRoundPlus className="size-5" aria-hidden="true" />
            </button>


            {show && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    onClick={(e) => { e.stopPropagation(); }}
                >
                    <div className="fixed inset-0 bg-black opacity-50"></div>

                    <div
                        className="bg-white rounded-lg shadow-lg z-50 w-full max-w-md mx-auto p-6 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center border-b pb-2">
                            <h3 className="text-lg font-semibold">Create a GroupChat</h3>
                            <button
                                className="text-gray-400 hover:text-gray-600"
                                onClick={handleClose}
                            >
                                X
                            </button>
                        </div>
                        <div className="overflow-y-auto w-full py-3">
                            <form onSubmit={handleSubmit} className='space-y-6'>
                                <div className='form-control'>
                                    <div className='relative '>
                                        <input type="text" className={`input input-bordered w-full  rounded-xl`} placeholder='Name' value={formData.groupName} onChange={handleInputChange} />
                                    </div>
                                </div>
                                {users && users.length > 0 ? (
                                    users.map(user => (
                                        <div key={user._id} className="flex items-center justify-between  ">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={user.profilePic || "/avatar.png"}
                                                    alt={`${user.fullName}'s avatar`}
                                                    className="size-12 object-cover rounded-full"
                                                />
                                                <div className="lg:block text-left min-w-0">
                                                    <div className="font-medium truncate">{user.fullName}</div>
                                                </div>
                                            </div>
                                            <input
                                                type="checkbox"
                                                value={user._id}
                                                className="w-4 h-4 accent-blue-500"
                                                checked={formData.members.includes(user._id)}
                                                onChange={() => handleCheckboxChange(user._id)}
                                            />

                                        </div>
                                    ))
                                ) : (
                                    <div className="text-red-700 text-center">No users avaliable</div>
                                )}
                                <div className="flex justify-end gap-2 border-t pt-2">
                                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                                        Create
                                    </button>
                                </div>
                            </form>





                        </div>

                    </div>
                </div>
            )}













        </>
    )
}

export default AddGroup