import { UndefinedInitialDataOptions } from "@tanstack/react-query"

export function defaultQueryOptions<TQueryFnData, TError, TData>(): UndefinedInitialDataOptions<TQueryFnData, TError, TData> {
    return {
        queryKey: [],
        retry: 0, //retry unsuccessful fetch
        gcTime: 0, //how long are data stored in memory
        staleTime: 0, //how long are data fresh
        enabled: true, //fetch automatically
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchInterval: 0, //do not refetch automatically
        refetchIntervalInBackground: false,
    };
}


export const queryKeys = {
    photoOfTheDay: "photoOfTheDay",
    earthPhotos: "earthPhotos",
}
