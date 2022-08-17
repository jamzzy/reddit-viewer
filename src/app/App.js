
import './App.css';
import redditIcon from '../data/icons/reddit.png';
import { SearchBar } from '../components/searchbar/SearchBar';
import { Posts } from '../components/posts/Posts';

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <div className='nav-container'>
            <img className="nav-icon" src={redditIcon} alt="reddit" />
            <h1>RedditViewer</h1>
          </div>
          <div className='nav-container'>
            <SearchBar />
          </div>
          <div className='nav-container'>
          </div>
        </nav>
      </header>

      <main>
        <Posts/>
      </main>
    </div>
  );
}

export default App;
