import React from "react";
import "./Post.css";
import likeSvg from "../../assets/iconmonstr-favorite-3.svg"
import timeSvg from '../../assets/iconmonstr-time-2.svg'
import notLikedSvg from "../../assets/iconmonstr-favorite-2.svg"
import Moment from "react-moment";

const Post = ({post, favorites, addFav}) => {
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
    return (
        <div className="Rectangle">
            <div className="flex">
            <div className="post-information" onClick={() => openInNewTab(post.story_url)}>
                <div className="post-time-container">
                    <img src={timeSvg} alt="time-svg"></img>
                    <span className="post-time"><Moment fromNow>{post.created_at}</Moment> by {post.author}</span>
                </div>
                <span className="post-title">{post.story_title}</span>
            </div>
            </div>
            <div className="likebutton-container" onClick ={() => addFav(post,post.objectID)}>
                {favorites.includes(post.objectID) ? (
                    <img src={likeSvg} alt="like-button"/>
                ) : (
                    <img src={notLikedSvg} alt="like-button" />
                )}
            </div>
        </div>
    );
}

export default Post;