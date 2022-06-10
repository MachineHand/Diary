import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  //upate때 필요 수정클릭시 클릭한 Post의 ID값을 찾고 불러와서 post변수에 저장
  //{ creator: '', title: '', message: '', tags: '', selectedFile: '' }
  //외에 다른 요소들은 다 쳐냄(create가 아니라 update이기때문에 ex)id값 )
  const dispatch = useDispatch();
  const classes = useStyles();

  //console.log(postData)

  useEffect(() => {
    if (post) setPostData(post);
    console.log(post);
  }, [post]);
  //post 값이 변경되었을때만 한번 실행

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();//submit 할때 새로고침 안되게
    if (currentId === 0) {
      check();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  //creater,title,message가 채워지지 않으면 작성하라고 나옴.
  const check = () => {
    let key = Object.keys(postData);
    let value = Object.values(postData);
    value.splice(3, 4);
    key.splice(3, 4);

    if (postData.creator !== '' && postData.title !== '' && postData.message !== '') {
      dispatch(createPost(postData));
      clear();
    }
    else if (postData.creator !== '' || postData.title !== '' || postData.message !== '') {
      for (let i = 0; i < 3; i++) {
        if (value[i] === '') {
          if (i === 2)
            alert(`필수항목(Essential)을 채워주세요`);
        }
      }
    }
    else {
      for (let i = 0; i < 3; i++)
        if (value[i] === '')
        alert(`필수항목(Essential)을 채워주세요`);
      }
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="creator" variant="outlined" label="Creator(Essential)" fullWidth value={postData.creator} onChange={(e) => (e.target.value !== null ? setPostData({ ...postData, creator: e.target.value }) : null)} />
        <TextField name="title" variant="outlined" label="Title(Essential)" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message(Essential)" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
