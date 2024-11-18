# Getting Started with React Tenstack/react-query framework
 step 1: install React-Query
 ### `npm i @tanstack/react-query`
 step 2:first create the instance of query client after that, provide for whole project like , context-provider , redux-store
  const queryClient = new QueryClient()

  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>

 ## for enabling query devtools support 
 step 1: npm i @tanstack/react-query-devtools   
 and add in top level inttialIsOpen make to true to see devtools support
 <ReactQueryDevtools initialIsOpen={false} />

 ##for getting started with React Tenstack/react-query  get methods
   let {data,error, isLoading}= useQuery({queryKey:['posts'],queryFn:postHandler})
   note 👉 there is no need of useState, useEffect , loding , error , every thing is given by useQuery 
   as well as it store the data inside cookie 

##GcTime
 gctime stand for garbage collection time by default it is set to 5 minutes we can change by using gcTime property
 in react-query for  the first time ,if we call any api it send back the response that response is saved to the cookie , for second time it is call ,first it take data from cookie and printing , but if is there any change is happening in server data that time new data will replace cookie and we will get new data in screen
useQuery({
    gcTime:timeinmillisecound
})
                                right now we are facing one issue , if you are going to one page to another , evry time api call is happening , but data will come from cookie only , is there any we can prevent every time api call (just for example if i know i am getting new data every after 10 min than why should we have to call in every api for that one we have to understand stale data)

##staleTime
 in react query , staleTime is a configuration option that determines how long fetched data is considered fresh before it need to refetched
 default time  set to 0 means data become stale (not fresh = baasi) immediately after being fetched
    let {data,error, isLoading}= useQuery(
    {queryKey:['posts'],
    queryFn:postHandler,
    staleTime:10000  //till 10s data is refreshed
})
so,if we navigate to the one page to same page that time fetched request is not goes to server(backend) directly data is going to read from cookie..

###data polling 
in react query , data polling is refers to the techique of fetching data from an api at regular intervals to keep ui up to data with the latest information. this is especially useful for senarios where data changes frequently and you wnat to disply real-time updates without requiring the user to manually refresh the page
  let {data,error, isLoading}= useQuery(
    {queryKey:['posts'],
    queryFn:postHandler,
    // gcTime:1000 //by default gcTime is set to 5 secound but i make there 1secound
    // staleTime:10000,  //till 10s data is refreshed
    // refetchInterval:100 //every 10 millseconds it is going to call api 
})
but if you navigate this page to another page it stop again you come than again start but you want to in background also api must have to call for that one you have to use 

  let {data,error, isLoading}= useQuery(
    {queryKey:['posts'],
    queryFn:postHandler,
    // gcTime:1000 //by default gcTime is set to 5 secound but i make there 1secound
    // staleTime:10000,  //till 10s data is refreshed
    // refetchInterval:100 //every 10 millseconds it is going to call api 
    refetchIntervalInBackground:true //in background also api will call
})  by default it is false.
 

Note :- just suppose if you are developing the pagigantion and you want to fetch new data when you click on next button that case  you have to pass the dependencies means if dependencies are changed then api called.
so , you will get new data form be but every single time you get loading.. if you dont want to show user loading and keep previous data you can do by using  
 
let {data,error, isLoading}= useQuery(
    {queryKey:['posts',count],
    queryFn:()=>postHandler(count),
     placeholderData:keepPreviousData
})


//useMutation
the useMutation hook is part of react query and is used for operations that modify data like, create,update and delete (CRUD operations)
syntax
const mutation =useMutation(mutationFn,{
    //optinal configuration 
})
we can provide various configuration options like onSuccess,onError,onSettled,mutationKey

mutate()
the mutate() function is used to execute the mutation in react query.  the process is the same whether your are:
Deleting data
Updating data
Creating new data
when you call .mutate().it tell react query to run the mutation function defined inside the useMutation hook. this is neeeded because the mutation is an action that changes data, unlike queries, which are used to fetch dat and are often atuo executed       
 
 one notepoint :- if you are doing deletion , thn you have to manually delete data form cache also else in backend it will delete but from front end it is not reflect  for that one
 first we are crating instance of the useQueryClient()
 const queryClient= useQueryClient()
 queryClient.setQueryData([pass query key],callback)
code 
  let deleteHandler=  useMutation({
        mutationFn:(id)=>deleteMethod(id),
        //after successful mutation
        
        onSuccess:(response,id)=>{
         //response is here for backend what response are you getting , id is your id for delete
         and here query have to pass query key because which cache data you want to delete
          queryClient.setQueriesData(['posts',count],(data)=>{
           return response.status===200 ? data.filter((item)=>item.id !==id):data
          })
            
        },
        //after failed mutation
        onError:(error)=>alert('Error Deleting')
      })


      #useInfiniteQuery
 
