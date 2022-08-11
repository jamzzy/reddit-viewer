import { Comment } from '../comment/Comment';
import './Comments.css';

export const Comments = () => {
    return (
        <div className='comments-container'>
            <Comment />
            <Comment />

            
        </div>
    );
}