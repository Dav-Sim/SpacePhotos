import axios, { AxiosError } from "axios";
import { EarthPhoto, PhotoOfTheDay } from "../types/photos";
import { ProblemDetails } from "../types/problemDetails";
import { useQuery } from "@tanstack/react-query";
import { defaultQueryOptions, queryKeys } from "./helpers";
import { Alert } from "../helpers/alert";


export const usePhotoOfTheDay = () => {
    return useQuery<PhotoOfTheDay, AxiosError<ProblemDetails>>({
        ...defaultQueryOptions(),
        gcTime: 60 * 60 * 1000,
        staleTime: 60 * 60 * 1000,
        queryKey: [queryKeys.photoOfTheDay],
        queryFn: async () => {
            try {
                const response = await axios.get<PhotoOfTheDay>(`api/photo/apod`);
                console.log(response);
                return response.data;
            }
            catch (error) {
                const message = axios.isAxiosError<ProblemDetails>(error) && error.response?.data ?
                    error.response.data.title : error?.toString();
                Alert(message ?? "ERROR", {
                    icon: "error"
                });
                return Promise.reject(error);
            }
        },
    });
};

export const useEarthPhotos = () => {
    return useQuery<EarthPhoto[], AxiosError<ProblemDetails>>({
        ...defaultQueryOptions(),
        gcTime: 60 * 60 * 1000,
        staleTime: 60 * 60 * 1000,
        queryKey: [queryKeys.earthPhotos],
        queryFn: async () => {
            try {
                const response = await axios.get<EarthPhoto[]>(`api/photo/epic`);
                console.log(response);
                return response.data;
            }
            catch (error) {
                const message = axios.isAxiosError<ProblemDetails>(error) && error.response?.data ?
                    error.response.data.title : error?.toString();
                Alert(message ?? "ERROR", {
                    icon: "error"
                });
                return Promise.reject(error);
            }
        },
    });
};