import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "./DataTable";
import { Avatar } from "../assets";
import { getAllUsers } from "../api";
import { setAllUserDetails } from "../context/actions/allUsersAction";
import { Spinner } from "../components"; // Import the Avatar and Spinner components
import { BsCheck, BsX } from "react-icons/bs"; // Import the check and x icons


const DBUsers = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers()
        .then((data) => {
          dispatch(setAllUserDetails(data));
        })
        .catch((error) => {
          // Handle any error with fetching users
          console.error("Error fetching users:", error);
        });
    }
  }, [allUsers, dispatch]);

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      {allUsers ? ( // Check if allUsers is available before rendering DataTable
        <DataTable
          columns={[
            {
              title: "Image",
              field: "photoURL",
              render: (rowData) => (
                <img
                  src={rowData.photoURL ? rowData.photoURL : Avatar}
                  alt="User Avatar"
                  className="w-32 h-16 object-contain rounded-md"
                />
              ),
            },
            {
              title: "Name",
              field: "displayName",
            },
            {
              title: "Email",
              field: "email",
            },
            {
              title: "Verified",
              field: "emailVerified",
              render: (rowData) => (
                <p
                  className={`px-2 py-1 w-32 text-center text-primary rounded-md ${
                    rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"
                  }`}
                >
                  {rowData.emailVerified ? (
                    <>
                      <BsCheck className="inline-block mr-1" />
                      Verified
                    </>
                  ) : (
                    <>
                      <BsX className="inline-block mr-1" />
                      Not Verified
                    </>
                  )}
                </p>
              ),
            },
          ]}
          data={allUsers} // Pass the array of users to the DataTable component
          title="List of Users"
        />
      ) : (
        // Show a custom loading message with a spinner
        <div className="flex items-center justify-center gap-2">
          <Spinner />
          <p className="text-headingColor font-semibold">Loading users...</p>
        </div>
      )}
    </div>
  );
};

export default DBUsers;
