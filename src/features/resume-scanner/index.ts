import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface ResumeScannerResponse {
  content: string;
}

interface UploadState {
  file: File | null;
  response: string | null;
  uploading: boolean;
  error: string | null | undefined; 
}

const initialState: UploadState = {
  file: null,
  response: null,
  uploading: false,
  error: null, 
};

export const uploadFile = createAsyncThunk<ResumeScannerResponse, FormData>(
  'file/uploadFile',
  async (formData) => {
    try {
      const response = await axios.post('api/uploadFile', formData);

      return response.data;
    } catch (error) {
      throw new Error('Failed to upload file');
    }
  }
);

// slice
const fileUploadSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    resetState: (state: UploadState) => {
      state.uploading = false;
      state.error = null;
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.uploading = false;
        state.response = action.payload.content;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.uploading = false;
        state.error = action?.error?.message;
      });
  },
});

export const { resetState } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
