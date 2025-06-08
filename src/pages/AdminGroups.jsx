import React, { useEffect } from 'react';
import { useAdminStore } from '../store/useAdminStore';
import { Trash } from 'lucide-react';
import { LoaderCircle } from 'lucide-react';


function AdminGroups() {
  const { allGroups, getAllGroups, removeGroup, isAdminGroupsLoading } = useAdminStore();
  useEffect(() => {
    getAllGroups?.();
  }, [getAllGroups]);

  const handleRemoveGroup = (groupId) => {

    removeGroup(groupId)

  }
  if (isAdminGroupsLoading) {
    return (
      <div className="flex items-center justify-center mb-6">
        <LoaderCircle className="size-10 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">All Groups</h2>
      <div className="p-3 bg-gray-800 shadow rounded-lg ">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left p-4 font-semibold text-white uppercase tracking-wide w-1/4">
                Group Name
              </th>
              <th className="text-center p-4 font-semibold text-white uppercase tracking-wide w-2/4">
                Members
              </th>
              <th className="text-right p-4 font-semibold text-white uppercase tracking-wide w-1/4">
                ...
              </th>
            </tr>
          </thead>
          <tbody>
            {allGroups.length > 0 ? (
              allGroups.map((group, i) => (
                <tr
                  key={group._id || i}
                  className="border-t hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                >
                  <td className="text-left p-4 text-white">{group.groupName}</td>
                  <td className="text-center p-4 text-white">
                    <div className="flex justify-center flex-wrap gap-2">
                      {group.members?.map((member, index) => (
                        <img
                          key={index}
                          src={member.profilePic}
                          alt="Profile"
                          className="size-8 rounded-full object-cover border border-white"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="text-right p-4 text-red-800"><button onClick={() => handleRemoveGroup(group._id)} className='cursor-pointer'>
                    <Trash className='inline-block' /></button></td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-3 text-gray-500 italic">
                  No groups found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminGroups;

