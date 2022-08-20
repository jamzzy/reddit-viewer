import './LoadSpinner.css';
import '../comment/Comment.css';
import '../post/Post.css';

export const LoadSpinner = ({ type }) => {

    if (type === 'comments') {
        return (
            [...Array(3)].map((e, index) => (
                <div className='comment-container' key={index}>
                    <div className='comment-info-container'>
                        <div className='skeleton-text skeleton skeleton-user'></div>
                        <div className='skeleton-text skeleton'></div>
                    </div>

                    <div className='comment-text-container'>
                        <div className='skeleton-text skeleton skeleton-body'></div>
                    </div>
                </div>
            ))
        )
    }

    if (type === 'posts') {
        return (
            [...Array(25)].map((e, index) => (

                <div className='post-container' key={index}>
                    <div className='postcontent-container'>
                        <div className='skeleton skeleton-heading skeleton-text postcontent-heading'></div>
                        <div className='skeleton skeleton-img'></div>

                    </div>

                    <div className='post-info-container'>
                            <div className='skeleton skeleton-text skeleton-commentcount'></div>
                            <div className='skeleton skeleton-text skeleton-date'></div>
                    </div>
                </div>

            ))
        )
    }

}