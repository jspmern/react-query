Getting Started with React Tenstack/react-query Framework
Installation
Step 1: Install React-Query
To install React-Query, run the following command:

Bash

npm i @tanstack/react-query
Step 2: Create and Provide Query Client
First, create an instance of the QueryClient, and then provide it to your entire project, similar to how you would use a context provider or Redux store.

JavaScript

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
</QueryClientProvider>
Enabling Query Devtools Support
Step 1: Install React-Query Devtools
To install React-Query Devtools, run the following command:

Bash

npm i @tanstack/react-query-devtools
Step 2: Add Devtools to Your Project
Add the ReactQueryDevtools component at the top level of your application. Set initialIsOpen to true to see the devtools support.

JavaScript

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<ReactQueryDevtools initialIsOpen={false} />
Getting Started with React Tenstack/react-query
Basic Usage of useQuery
To fetch data using React Query, you can use the useQuery hook. This hook provides data, error, and loading states, eliminating the need for useState, useEffect, and manual loading/error handling.

JavaScript

const { data, error, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: postHandler,
});
Garbage Collection Time (gcTime)
gcTime stands for garbage collection time. By default, it is set to 5 minutes. You can change this using the gcTime property in React Query. When an API is called for the first time, the response is saved in the cache. On subsequent calls, the data is fetched from the cache unless there is a change in the server data.

JavaScript

useQuery({
  queryKey: ['posts'],
  queryFn: postHandler,
  gcTime: timeInMilliseconds,
});
Stale Time (staleTime)
In React Query, staleTime is a configuration option that determines how long fetched data is considered fresh before it needs to be refetched. The default time is set to 0, meaning data becomes stale immediately after being fetched.

JavaScript

const { data, error, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: postHandler,
  staleTime: 10000, // Data is considered fresh for 10 seconds
});
Data Polling
Data polling in React Query refers to the technique of fetching data from an API at regular intervals to keep the UI up to date with the latest information. This is useful for scenarios where data changes frequently, and you want to display real-time updates without requiring the user to manually refresh the page.

JavaScript

const { data, error, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: postHandler,
  refetchInterval: 10000, // Fetch data every 10 seconds
  refetchIntervalInBackground: true, // Continue fetching data in the background
});
Pagination
If you are developing pagination and want to fetch new data when you click the next button, you need to pass dependencies. If dependencies change, the API is called. To avoid showing a loading state every time and keep the previous data, you can use placeholderData.

JavaScript

const { data, error, isLoading } = useQuery({
  queryKey: ['posts', count],
  queryFn: () => postHandler(count),
  placeholderData: keepPreviousData,
});
Using useMutation
The useMutation hook is part of React Query and is used for operations that modify data, such as create, update, and delete (CRUD operations).

Syntax
JavaScript

const mutation = useMutation(mutationFn, {
  // Optional configuration
});
You can provide various configuration options like onSuccess, onError, onSettled, and mutationKey.

Executing Mutations with mutate()
The mutate() function is used to execute the mutation in React Query. This process is the same whether you are deleting, updating, or creating new data. When you call .mutate(), it tells React Query to run the mutation function defined inside the useMutation hook.

Example: Deleting Data
If you are deleting data, you need to manually delete the data from the cache as well. Otherwise, it will be deleted from the backend but not reflected in the frontend.

JavaScript

import { useMutation, useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

const deleteHandler = useMutation({
  mutationFn: (id) => deleteMethod(id),
  onSuccess: (response, id) => {
    // Update the cache after successful mutation
    queryClient.setQueryData(['posts', count], (data) => {
      return response.status === 200 ? data.filter((item) => item.id !== id) : data;
    });
  },
  onError: (error) => alert('Error Deleting'),
});
Using useInfiniteQuery
The useInfiniteQuery hook is used for fetching paginated data in an infinite scrolling manner. This hook helps in loading more data as the user scrolls down.

Example
JavaScript

import { useInfiniteQuery } from '@tanstack/react-query';

const fetchPosts = ({ pageParam = 1 }) => {
  return fetch(`/api/posts?page=${pageParam}`).then((res) => res.json());
};

const {
  data,
  error,
  isLoading,
  fetchNextPage,
  hasNextPage,
} = useInfiniteQuery('posts', fetchPosts, {
  getNextPageParam: (lastPage, pages) => lastPage.nextPage ?? false,
});
This documentation provides a comprehensive guide to getting started with React Tenstack/react-query. By following these steps, you can efficiently manage data fetching, caching, and synchronization in your React applications.

