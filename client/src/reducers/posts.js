import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE,HATE } from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case HATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case CREATE:
      return [...posts, action.payload];
      //action.payload=createPost.{data}
      //posts[{data},{data},...]들어있는 상태
      //{data}={ creator: '', title: '', id:'', ...}
    case UPDATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};



//payload:액션에 필요한 데이터
/*
************************************************************************
index.js
const 체중 =100;

function reducer(state = 체중,action){
  if(action.type ==='증가'){
    state++;
    return state
  }
}
************************************************************************

************************************************************************
App.js

component에서 store에 있던 state 쓰려면
App(){
const 꺼내온거 = useSelector((state)=>state);
const dispatch = useDispatch();

return(
  <p>님의 처참한 몸무게 : {꺼내온거}></p>
)
}

state 수정요청=dispatch
<button onClick={()=>{dispatch({type:'증가'}) }}더하기</button> 
************************************************************************




*/