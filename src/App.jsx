import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import DarkMode from "./components/DarkMode";

import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }


  }, [])


  const savetoLS = (params) => {

    localStorage.setItem("todos", JSON.stringify(todos))
  }



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    savetoLS()

  }
  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    savetoLS()


  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    savetoLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)

  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    savetoLS()
  }


  return (
    <>
      <Navbar />
        
      <div className="da container w-[60%] mx-auto  p-5 rounded-xl my-5 mx-auto  bg-indigo-100 min-h-[80vh] ">
      <h1 className="text-center text-xl font-bold">iTask - Manage your todos at one place</h1>
        <div className="classtodo"><h1 className="add text-xl font-bold mt-5">Add a Todo</h1>

          <input onChange={handleChange} value={todo} className="bg-white border-2 border-black p-1.5 rounded-2xl mt-2 mb-2 w-[60%]" type="text" />
          <button onClick={handleAdd} className=' bg-indigo-800 text-white p-2 pr-3 pl-3 rounded-lg mx-2 hover:cursor-pointer hover:bg-indigo-600 transition-all mt-5 '>Save</button></div>
        <h1 className=" text-xl font-bold mt-5  ">
          Your Todos
        </h1>

        {todos.length === 0 && <div className='m-5'>NO TODOS TO SHOW</div>}
        {
          todos.map(item => {



            return <div key={item.id} className="flex items-center w-[69%] justify-between todo-wrapper">
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} id="" />

                <div className={`todo-text ${item.isCompleted ? "line-through" : ""}`}>
                  {item.todo}
                </div>
              </div>
              <div className="todo-buttons button flex mt-3 h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className=' bg-indigo-800 text-white pr-3 pl-3 p-2 rounded-lg mx-5 hover:cursor-pointer  hover:bg-indigo-600 transition-all'> Edit </button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className=' bg-indigo-800 text-white pr-3 pl-3 p-2 rounded-lg mx-5 hover:cursor-pointer  hover:bg-indigo-600 transition-all '> Delete </button>
              </div>
            </div>
          })
        }
      </div>
       <DarkMode />
    </>
  )
}

export default App
