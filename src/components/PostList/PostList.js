import React from "react";
import Post from "../Post/Post";
import "./PostList.css";

const PostsList = ({postsList, favorites, addFav}) => {
    return(
        <div className="posts-container">
            <div className="posts-grid">
            {postsList || postsList !== undefined ? postsList.map((post,key) => {
                return(
                    <Post post={post} favorites={favorites} addFav={addFav} key={key}/>
                );
            }) :
            <h1>Loading Posts...</h1>
        }
            </div>
        </div>
    );
}

export default PostsList