import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Address {
  line1: string;
  line2: string;
  state: string;
  city: string;
  pin: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  linkedinUrl: string;
  gender: string;
  address: Address;
}

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;