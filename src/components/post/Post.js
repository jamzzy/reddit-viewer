import './Post.css';
import { Comments } from '../comments/Comments';
import commentsIcon from '../../data/icons/chat-bubble.png';
import moment from 'moment';
import React, {useState} from 'react';


export const Post = ({post}) => {

    const [viewComments, setViewComments] = useState(false);

    if(!post) {
        return null;
    }

  
    return (
        <div className='post-container'>
            <div className='postcontent-container'>
                <h1 className='postcontent-heading'>{post.title}</h1>
                {post.post_hint === 'image' ? <img className='postcontent-img' src={post.media} alt={post.title}/> : <p>no image</p>}
                
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