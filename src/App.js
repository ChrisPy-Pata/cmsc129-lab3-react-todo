/* References :
- https://www.youtube.com/watch?v=dLySJhRL-AA&list=PLt4757glfbhGMJ9LxziIBKkUVAKQoVHn6
-  
*/

import './App.css';

// Components Imports
import Sidebar from './components/Sidebar';
import Main from './components/Main';

// Header Section
import AddNewTodo from './components/AddNewTodo';
import ShowTodo from './components/ShowTodo';
import SortTodo from './components/SortTodo';

// Main Section
import Todos from './components/Todos';
import EditTodo from './components/EditTodo';

// {TUTORIAL NOTE}
// Header and main takes some children and show them.

// Header - Sidebar Components
// Main - Show Todos and Edit Todos

function App() {
  return (
    <div className='App'>
      
      <Sidebar>
        
        <AddNewTodo />
        <ShowTodo />
        <SortTodo />

      </Sidebar>

      <Main>
        
        <Todos />
        <EditTodo />

      </Main>
    </div>
  );
}

export default App;
