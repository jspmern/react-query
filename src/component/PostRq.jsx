import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { deleteMethod, editMethod, postHandler } from '../utilitis/Api'
import { Link, NavLink } from 'react-router-dom'
function PostRq() {
    let [count, setCount] = useState(0)
    //this is the instance by using we can delete cache locally
    let queryClient = useQueryClient()
    //this is without pagination for 
    //    let {data,error, isLoading}= useQuery(
    //     {queryKey:['posts'],
    //     queryFn:postHandler,
    //     // gcTime:1000 //by default gcTime is set to 5 secound but i make there 1secound
    //     // staleTime:10000,  //till 10s data is refreshed
    //     // refetchInterval:100 //every 10 millseconds it is going to call api 
    //     // refetchIntervalInBackground:true //in background also api will call
    // })
    let { data, error, isLoading } = useQuery(
        {
            queryKey: ['posts', count],
            queryFn: () => postHandler(count),
            placeholderData: keepPreviousData  //instead of showing the loading it show previous data
        })
    //for deletion of post
    let deleteHandler = useMutation({
        mutationFn: (id) => deleteMethod(id),
        //after successful mutation
        onSuccess: (response, id) => {
            queryClient.setQueriesData(['posts', count], (data) => {
                return response.status === 200 ? data.filter((item) => item.id !== id) : data
            })

        },
        //after failed mutation
        onError: (error) => alert('Error Deleting')
    })

    //for editing the post
    let editHandler = useMutation({
        mutationFn: (data) => editMethod(data),
        onSuccess: (response, value) => {
            return  queryClient.setQueriesData(['posts', count], (data) => {
                return data.map((item) => item.id === value.id? {...item,...value} : item)
              })

    
        },
        onError: (error) => alert('Error Editing')
    })
    if (isLoading) return <h1>LOADING......</h1>
    if (error) return <h1> Error:{error.message || "somthing wrong"}</h1>
    return (
        <div className="container">
            <div className="row d-flex" >
                {data?.map((item) => {
                    return <div className="col" style={{ minWidth: "100%", minHeight: "55px", border: "1px solid black" }} >
                        <Link to={`/post/${item.id}`} style={{ color: 'black', textDecoration: "none" }}>
                            <span>{item.id}</span>
                            <h1>{item?.title}</h1>
                        </Link>
                        <span><button onClick={() => {
                            deleteHandler.mutate(item.id)
                        }}>delete</button></span>
                        <span>
                            <button onClick={() => {
                                editHandler.mutate({userId:item.id,title:"utsav kumar jha",id:item.id})
                            }}>edit</button>
                        </span>
                    </div>


                })}

            </div>
            <br />
            <br />
            <button disabled={count === 0 ? true : false} onClick={() => {
                setCount((pre) => pre - 3)
            }}>-</button> {(count / 3) + 1} <button onClick={() => {
                setCount((pre) => pre + 3)
            }}>+</button>
        </div>
    )
}

export default PostRq