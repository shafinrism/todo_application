

import './App.css'
import Header from './components/Header'
import ToDoList from './components/ToDoList'

function App() {
  

  return (
    <div className='container mx-auto py-16 px-6 min-h-screen font-Poppins'>
      <Header></Header>
      <ToDoList></ToDoList>
    </div>
  )
}

export default App
