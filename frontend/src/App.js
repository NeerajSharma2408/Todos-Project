
import './App.css';
import MakeNote, {loader as displayLoader, postAndDeleteAction} from './components/NoteForm';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import { deleteAction } from './components/NotesList';

const router = createBrowserRouter([
  {
    path: '/', element: <MakeNote/>, loader: displayLoader , action: postAndDeleteAction
  }
]);

function App() {

  return (
    <>
      <div className="App">
      <RouterProvider router={router}/>
      </div>
    </>
  );
}

export default App;
