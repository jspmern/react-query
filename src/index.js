import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './component/Layout';
import Error from './component/Error';
import Post from './component/Post';
import User from './component/User';
import Details from './component/Details';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Home from './component/Home';
import PostRq from './component/PostRq';
import Abc from './component/Abc';
 

const root = ReactDOM.createRoot(document.getElementById('root'));
//first create the instance of query client after that provide for whole project like , context-provider , redux-store
const queryClient = new QueryClient()
 
   let router=createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      errorElement:<Error/>,
      children:[
            {
              path:"",
              element:<Home/>
            },
            {
              path:'user',
              element:<User/>
            } ,
            {
              path:'post',
              element:<Post/>
            } ,
            {
              path:'post-rq',
              element:<PostRq/>
            } ,
            {
              path:"post/:id",
              element:<Details/>
            }
      ]
    }
   ])

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

    <RouterProvider router={router}></RouterProvider>
    <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>
);

 
