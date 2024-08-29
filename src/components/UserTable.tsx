import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  Trash2,
} from "lucide-react";

export interface User {
  id: string;
  name: string;
  email: string;
  linkedinUrl: string;
  gender: string;
  address: {
    line1: string;
    line2: string;
    state: string;
    city: string;
    pin: string;
  };
}

interface UserTableProps {
  users: any;
  onEdit: any;
  onDelete: any;
  isEditable: boolean;
}

export function UserTable({
  users,
  onEdit,
  onDelete,
  isEditable,
}: UserTableProps) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRowExpansion = (userId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <Table >
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>LinkedIn URL</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
        {users &&
          users?.map((user: any) => (
            <>
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.linkedinUrl}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>
                  <div className="flex w-full gap-2">
                    {isEditable && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(user)}
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRowExpansion(user.id)}
                    >
                      {expandedRows[user.id] ? (
                        <ChevronUpIcon className="w-4 h-4" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              {expandedRows[user.id] && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <div>
                      <p>Address:</p>
                      <p>{user.address.line1}</p>
                      <p>{user.address.line2}</p>
                      <p>
                        {user.address.city}, {user.address.state} -{" "}
                        {user.address.pin}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
      </TableBody>
    </Table>

  );
}
