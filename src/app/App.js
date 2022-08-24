import './App.css';
import redditIcon from '../data/icons/reddit.png';
import { SearchBar } from '../components/searchbar/SearchBar';
import { Posts } from '../components/posts/Posts';
import { ScrollTopButton } from '../components/scrolltopbutton/ScrollTopButton';
import { DropDownSelect } from '../components/dropdownselect/DropDownSelect';
function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <div className='nav-container logo'>
            <img className="nav-icon" src={redditIcon} alt="reddit" />
            <h1>RedditViewer</h1>
          </div>
          <div className='nav-container'>
            <SearchBar />
          </div>
          <div className='nav-container subreddit-select'>
            <DropDownSelect />
          </div>
        </nav>
      </header>

      <main>
        <Posts/>
        <ScrollTopButton />
      </main>
    </div>
  );
}

export default App;
