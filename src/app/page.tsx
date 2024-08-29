"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { UserTable } from "@/components/UserTable";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { addUser, updateUser, deleteUser, UserState } from "@/redux/userSlice";
import { RootState } from "@/redux/store";
import { formConfig } from "@/config/formConfig";
import { UserFormDialog } from "@/components/UserFormDialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 5; 

  const users: UserState = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const handleAddUser = (userData: any) => {
    dispatch(addUser(userData));
    setIsFormOpen(false);
  };

  const handleEditUser = (userData: any) => {
    dispatch(updateUser(userData));
    setEditUser(null);
  };

  const handleDeleteUser = () => {
    if (deleteUserId) {
      dispatch(deleteUser(deleteUserId));
      setDeleteUserId(null);
      setIsOpen(false);
    }
  };

  const handleUserID = (id: any) => {
    setDeleteUserId(id);
    setIsOpen(true);
  };

  const skip = currentPage * limit;
  const totalPages = Math.ceil(users.users.length / limit);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="flex justify-end w-full">
        <Button onClick={() => setIsFormOpen(true)}>Add User</Button>
      </div>
      <div className="h-[400px]">
        <UserTable
          users={users.users.slice(skip, skip + limit)}
          onEdit={setEditUser}
          onDelete={handleUserID}
          isEditable={formConfig.isEditable}
        />
      </div>

      <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => setCurrentPage(index)}
                // active={index === currentPage}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <UserFormDialog
        isOpen={isFormOpen || !!editUser}
        onOpenChange={(open: any) => {
          setIsFormOpen(open);
          if (!open) setEditUser(null);
        }}
        editUser={editUser}
        onSubmit={editUser ? handleEditUser : handleAddUser}
      />
      {deleteUserId && (
        <DeleteConfirmation
          onConfirm={handleDeleteUser}
          isOpen={isOpen}
          onCancel={() => {
            setIsOpen(false);
            setDeleteUserId(null);
          }}
        />
      )}
    </main>
  );
}
