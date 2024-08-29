import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserForm } from "./UserForm"; 

export function UserFormDialog({ isOpen, onOpenChange, editUser, onSubmit }:any) {
  const handleSubmit = (data:any) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[70%] h-full overflow-auto">
        <DialogHeader>
          <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
          <DialogDescription>
            {editUser ? "Edit user details below." : "Enter user details below."}
          </DialogDescription>
        </DialogHeader>
        <UserForm
          user={editUser}
          onSubmit={handleSubmit}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
