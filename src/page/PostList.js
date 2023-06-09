import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Spin } from "antd";
import axiosInstance from "../axios/AxiosInstance";
import "../styles/PostList.css";
import { CONSTANT } from "../constant/Constant";

const PostList = () => {
  const [userPost, setUserPost] = useState([]);
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false)
  const { id } = useParams();

  // get user uploaded posts
  const getPosts = async () => {
    setLoading(true)
    await axiosInstance
      .get(`/users/${id}/posts`)
      .then((response) => {
        // Handle the response
        setUserPost(response?.data);
      })
      .catch((error) => {
        // Handle the error
        setLoading(false)
      });
    setLoading(false)
  };

  // Get user details for this posts
  const getUser = async () => {
    await axiosInstance
      .get(`/users/${id}`)
      .then((response) => {
        setUserName(response?.data?.name);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  useEffect(() => {
    getPosts();
    getUser();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="postList_container">
      <h2 className="userTitle">{userName} {CONSTANT.POSTS}</h2>
      <div className="postList_wrapper">
        {!loading 
          ? userPost?.map(({ body, title, id }) => {
            return (
              <Card
                key={id}
                style={{
                  width: 300,
                }}
              >
                <p>
                  <b>{title.slice(0, 50)}</b>
                </p>
                <p>{body.slice(0, 200)}</p>
              </Card>
            );
          })
          : <Spin size="large" />}
        {!loading && userPost.length === 0 && <h2>{CONSTANT.NO_POST_FOUND}</h2>}
      </div>
    </div>
  );
};

export default PostList;
