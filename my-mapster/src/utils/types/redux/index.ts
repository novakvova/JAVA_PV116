import {AsyncThunk} from '@reduxjs/toolkit';

// eslint-disable-next-line
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>