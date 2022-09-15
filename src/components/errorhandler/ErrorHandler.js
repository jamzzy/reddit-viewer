import './ErrorHandler.css';
import refreshIcon from '../../data/icons/refresh.png';


export const ErrorHandler = ({ errorMsg }) => {

    return (
        <div className={'error-container' + (errorMsg === 'subreddits' ? ' subreddits-type' : '')}>
            <h1>Error loading {errorMsg}. Try refresh.</h1>
            <img className='refresh-icon' src={refreshIcon} alt='reload' onClick={() => window.location.reload()} />
        </div>

    )
}