import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE ,HATE} from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    //console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });//액션 오브젝트
  } catch (error) {
    console.log(error.message);
  }
};


export const createPost = (post) => async (dispatch) => {
  //post=Form/Form.js(create,update).postData
  try {
    const { data } = await api.createPost(post);
    //api.createPost(post)를 서버에 저장하고 다 만들어지면 {data}에 POST값이 들어감.
    console.log(data);  //{ creator: '', title: '', id:'', ...}
    dispatch({ type: CREATE, payload: data });//payload:액션에 필요한 데이터
    //보내는 data 사용가능
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const hatePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.hatePost(id);
    dispatch({ type: HATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
