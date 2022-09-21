import './Post.css';
import { Comments } from '../comments/Comments';
import commentsIcon from '../../data/icons/chat-bubble.png';
import moment from 'moment';
import React, { useState } from 'react';

export const Post = ({ post }) => {

    const [viewComments, setViewComments] = useState(false);

    //If not post is passed, return null
    if (!post) {
        return null;
    }

    //Returns JSX for container displaying, post content, and post info, and comment components
    return (
        <div className='post-container'>
            <div className='postcontent-container'>
                <h1 className='postcontent-heading'>{post.title}</h1>

                {
                    post.post_hint === 'image'
                    &&
                    <img className='postcontent-img' src={post.url} alt={post.title} />
                }

                {
                    (post.post_hint === 'link' || post.post_hint === 'rich:video' || post.url.includes('gallery'))
                    &&
                    <div className='postcontent-text'>
                        <a href={post.url}>{post.url}</a>
                    </div>
                }

                {
                    post.selftext
                    &&
                    <div className='postcontent-text' dangerouslySetInnerHTML={{ __html: post.selftext }}></div>
                }

                {
                    post.post_hint === 'hosted:video'
                    &&
                    post.is_video
                    &&
                    (
                        <video data-testid='video-post-test' controls>
                            <source src={post.media.reddit_video.fallback_url} />
                            Video not supported by browser
                        </video>
                    )
                }

            </div>

            <div className='post-info-container'>
                <div className='commentcount-container'>
                    <img src={commentsIcon} alt='comments' className='comments-icon' onClick={(e) => setViewComments(!viewComments)} />
                    <h1 className='commentcount-label'>{post.num_comments}</h1>

                </div>
                <div className='user-date-contatiner'>
                    <h1>posted {moment.unix(post.created_utc).fromNow()} by <span className='author-label'>{post.author}</span> </h1>
                </div>

            </div>
            {viewComments ? <Comments postID={post.id} permalink={post.permalink} /> : null}
        </div>
    )
}