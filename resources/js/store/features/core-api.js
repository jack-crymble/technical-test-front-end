import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coreApi = createApi({
    reducerPath: "coreApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost/api",
    }),
    endpoints: (builder) => ({
        getFarm: builder.query({
            query: (farmId) => `/farms/${farmId}`,
            transformResponse: (response) => response.data,
        }),
        getFarms: builder.query({
            query: () => `/farms`,
            transformResponse: (response) => response.data,
        }),
        getFarmTurbines: builder.query({
            query: (farmId) => `/farms/${farmId}/turbines`,
            transformResponse: (response) => response.data,
        }),
        getTurbines: builder.query({
            query: () => `/turbines`,
            transformResponse: (response) => response.data,
        }),
        getComponents: builder.query({
            query: () => `/components`,
            transformResponse: (response) => response.data,
        }),
        getComponentTypes: builder.query({
            query: () => `/component-types`,
            transformResponse: (response) => response.data,
        }),
        getInspections: builder.query({
            query: () => `/inspections`,
            transformResponse: (response) => response.data,
        }),
        getGrades: builder.query({
            query: () => `/grades`,
            transformResponse: (response) => response.data,
        }),
        getGradeTypes: builder.query({
            query: () => `/grade-types`,
            transformResponse: (response) => response.data,
        }),
    }),
});

export const {
    useGetFarmQuery,
    useGetFarmsQuery,
    useGetFarmTurbinesQuery,
    useGetTurbinesQuery,
    useGetComponentsQuery,
    useGetComponentTypesQuery,
    useGetInspectionsQuery,
    useGetGradesQuery,
    useGetGradeTypesQuery,
} = coreApi;
