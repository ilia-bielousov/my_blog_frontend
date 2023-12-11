import Client from './Client';
import Admin from './Admin';
import './App.css';

const App = () => {
  return (
    <div className="App flex flex-col flex-1">
      <Client />
      <Admin />
    </div>
  );
}

export default App;
