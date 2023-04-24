import logo from './logo.svg';
import './App.css';
import Gallary from './components/Gallary';
import { Provider } from 'react-redux';
import store from './components/store/store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Gallary></Gallary>
      </div>
    </Provider>
    
  );
}

export default App;