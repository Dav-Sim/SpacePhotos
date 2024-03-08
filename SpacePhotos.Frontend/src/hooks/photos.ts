import axios, { AxiosError } from "axios";
import { EarthPhoto, PhotoOfTheDay } from "../types/photos";
import { ProblemDetails } from "../types/problemDetails";
import { useQuery } from "@tanstack/react-query";
import { defaultQueryOptions, queryKeys } from "./helpers";
import { useContext } from "react";
import { ProblemContext } from "../context/ProblemContext";


export const usePhotoOfTheDay = (from?: Date, to?: Date) => {

    const problemContext = useContext(ProblemContext);

    return useQuery<PhotoOfTheDay[], AxiosError<ProblemDetails>>({
        ...defaultQueryOptions(),
        gcTime: 60 * 60 * 1000,
        staleTime: 60 * 60 * 1000,
        queryKey: [queryKeys.photoOfTheDay, from, to],
        queryFn: async () => {
            try {
                const response = await axios.get<PhotoOfTheDay[]>(`api/photo/apod?from=${from?.toISOString()?.substring(0, 10) ?? ""}&to=${to?.toISOString()?.substring(0, 10) ?? ""}`);
                return response.data;
            }
            catch (error) {
                const message = axios.isAxiosError<ProblemDetails>(error) && error.response?.data ?
                    error.response.data.title : error?.toString();

                problemContext.setProblem?.(message ?? "ERROR");

                return Promise.reject(error);
            }
        },
    });
};

export const useEarthPhotos = (date?: Date) => {

    const problemContext = useContext(ProblemContext);

    return useQuery<EarthPhoto[], AxiosError<ProblemDetails>>({
        ...defaultQueryOptions(),
        gcTime: 60 * 60 * 1000,
        staleTime: 60 * 60 * 1000,
        queryKey: [queryKeys.earthPhotos, date],
        queryFn: async () => {
            try {
                const response = await axios.get<EarthPhoto[]>(`api/photo/epic?date=${date?.toISOString()?.substring(0, 10) ?? ""}`);
                return response.data;
            }
            catch (error) {
                const message = axios.isAxiosError<ProblemDetails>(error) && error.response?.data ?
                    error.response.data.title : error?.toString();

                problemContext.setProblem?.(message ?? "ERROR");

                return Promise.reject(error);
            }
        },
    });
};