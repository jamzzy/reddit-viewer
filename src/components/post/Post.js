import './Post.css';
//import { PostContent } from '../postcontent/PostContent';
import { Comments } from '../comments/Comments';
import commentsIcon from '../../data/icons/chat-bubble.png';
import moment from 'moment';


export const Post = ({post}) => {

    if(!post) {
        return null;
    }
    console.log(post);
  
    return (
        <div className='post-container'>
            <div className='postcontent-container'>
                <h1 className='postcontent-heading'>{post.title}</h1>
                {post.post_hint === 'image' ? <img className='postcontent-img' src={post.media} alt={post.title}/> : <p>no image</p>}
                
            </div>
            
            <div className='post-info-container'>
                <div className='commentcount-container'>
                    <img src={commentsIcon} alt='comments' className='comments-icon' />
                    <h1 className='commentcount-label'>{post.num_comments}</h1>

                </div>
                <div className='user-date-contatiner'>
                    <h1>posted {moment.unix(post.created_utc).fromNow()} by <span className='author-label'>{post.author}</span> </h1>
                </div>
                
            </div>
            <Comments />
        </div>
    )
}