import axios from 'axios';

export const handleAxiosError = (error: unknown, defaultMessage: string): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data ?? defaultMessage;
    } else {
        return defaultMessage;
    }
};