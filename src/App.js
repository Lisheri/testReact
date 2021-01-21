import logo from './logo.svg';
import './App.css';
import TestTree from './views/testTree'
import Slot from './views/slots/slot'
import Hoc from './views/hoc'
import Hooks from './views/hooks'

function App() {
  return (
    <div className="App">
      <TestTree />
      <Slot />
      <Hoc me="我是高阶组件体验人"/>
      <Hooks />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
