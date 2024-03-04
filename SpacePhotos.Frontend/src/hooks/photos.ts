import axios, { AxiosError } from "axios";
import { PhotoOfTheDay } from "../types/photos";
import { ProblemDetails } from "../types/problemDetails";
import { useQuery } from "@tanstack/react-query";
import { defaultQueryOptions, queryKeys } from "./helpers";
import { Alert } from "../helpers/alert";


export const usePhotoOfTheDay = () => {
    return useQuery<PhotoOfTheDay, AxiosError<ProblemDetails>>({
        queryKey: [queryKeys.photos],
        queryFn: async () => {
            try {
                const response = await axios.get<PhotoOfTheDay>(`api/photo/apod`);
                console.log(response);
                return response.data;
            }
            catch (error) {
                const message = axios.isAxiosError<ProblemDetails>(error) && error.response?.data ?
                    error.response.data.title : error?.toString();
                Alert(message ?? "ERROR");
                return Promise.reject(error);
            }
        },
        ...defaultQueryOptions
    });
};