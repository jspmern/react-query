import axios from "axios";
let api = new axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});
//this is for all post
let postHandler = async (count) => {
  try {
    let response = await api.get(
      `https://jsonplaceholder.typicode.com/posts?_start=${count}&_limit=3`
    );

    return response.status === 200 ? response.data : [];
  } catch (err) {
    console.log(err);
  }
};

//this is for single post
let getSinglePostHandler = async (id) => {
  try {
    let response = await api.get(`/posts/${id}`);
    return response.status === 200 ? response.data : [];
  } catch (err) {
    console.log(err);
  }
};
//this is for delete post
let deleteMethod = async (id) => {
  try {
    let response = await api.delete(`posts/${id}`);
    return response.status === 200 ? response : {};
  } catch (error) {
    console.log(error);
  }
};
//this is for edit Method
let editMethod = async (value) => {
  try {
    let response = await api.put(`posts/${value.id}`, { value });
    return response;
  } catch (err) {
    console.log(err);
  }
};

//this is for fetch github user informatation
let fetchUserHandler = async (data) => {
  try {
    let pageNo = data.pageParam || 1;
    let url = `https://api.github.com/users?per_page=10&page=${pageNo}`;
    let response = await api.get(url);
    return response.status === 200 ? response.data : [];
  } catch (error) {
    console.log(error);
  }
};
export {
  api,
  postHandler,
  getSinglePostHandler,
  deleteMethod,
  editMethod,
  fetchUserHandler,
};
