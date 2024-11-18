import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { fetchUserHandler } from '../utilitis/Api'

function User() {

    // console.log('.......................................')
    let { hasNextPage, error, data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['user'],
        queryFn: fetchUserHandler,
        getNextPageParam: (lastpage, allpage) => {
            return lastpage.length === 10 ? allpage.length + 1 : undefined;
        }

    })
    function scrollFunctionHandler() {

        let bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1
        if (bottom && hasNextPage) {

            fetchNextPage()
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', scrollFunctionHandler)
        return () => window.removeEventListener('scroll', scrollFunctionHandler)
    }, [hasNextPage])

    return (

        <div>
            {data?.pages?.map((item) => {
                return <div key={item.id}>
                    {item.map((item) => {
                        return <>  <h1>{item.id} and {item.login}</h1>
                            <img src={item.avatar_url} style={{ height: "55px", width: "55px" }} alt='abc' />
                        </>
                    })}
                </div>
            })}
            {isFetchingNextPage && <h1>loading......</h1>}
        </div>
    )
}

export default User