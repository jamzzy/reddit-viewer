import './Comment.css';
import moment from 'moment';

export const Comment = ({ comment }) => {

    //If there is no comment passed, null is returned
    if (!comment) {
        return null;
    }

    //Returns JSX to display a comment
    return (
        <div className='comment-container'>
            <div className='comment-info-container'>
                <p className='username-text'>{comment.author}</p>
                <p className='postedDate-text'>{moment.unix(comment.created_utc).fromNow()}</p>
            </div>

            <div className='comment-text-container'>
                <p className='comment-text'>{comment.body}</p>
            </div>
        </div>
    );

}