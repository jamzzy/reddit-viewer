import './Post.css';
import { PostContent } from '../postcontent/PostContent';
import { Comments } from '../comments/Comments';
import commentsIcon from '../../data/icons/chat-bubble.png';

export const Post = () => {
    return (
        <div className='post-container'>
            
            <PostContent />
            <div className='post-info-container'>
                <div className='commentcount-container'>
                    <img src={commentsIcon} alt='comments' className='comments-icon' />
                    <h1 className='commentcount-label'>23</h1>

                </div>
                <div className='user-date-contatiner'>
                    <h1>username | jan 6 2021</h1>
                </div>
                
            </div>
            <Comments />
        </div>
    )
}