import React, { useEffect,useState, useRef } from "react";
import "./Todo.css";
//react-icon import
import { IoMdDoneAll } from "react-icons/io";
import { DiEdit, FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
  // const[car,setCar]=useState({ //dictonary
  //     colour:'red',
  //     year:'1965',
  //     name:'maruti'
  // })

  // const arr =[1,2,3,4,5,6]

  const [input, setInput] = useState(""); // charcter var
  const [arr, setArr] = useState([]); //array var
  const[editId, setEditID] = useState(0)

  // const addTodo = () => {
  //   //function
  //   //setData([data, input]);
  //   // setData([...data, input]);
  //   // setData([...data, { list: input, id: Date.now() }]); //object
  //   setArr([...arr, { list: input, id: Date.now() ,status:false}]);
  //   console.log(input); //viewonconsole
  //   setInput(""); //cleartextbox
  // };

  const addTodo=()=>{
    if(input !== ''){
      setArr([...arr, { list: input, id: Date.now() ,status:false}]);
      setInput("");
    }
    if(editId){
      const edit = arr.find((input)=>input.id === editId)
      const update = arr.map((data)=>data.id === edit.id
      ? (data = {id : data.id, list : input})
      : (data = {id : data.id , list : data.list}))
      setArr(update)
      setEditID(0);
      setInput('')
    }
  }

  const handleSubmit = (e) => {
    //onsubmitfunction for all <form>
    e.preventDefault(); //e=event,preventDefault() = inbulid
  };

  const inputRef = useRef("null"); //first calling function

  useEffect(() => {
    // console.log(inputRef.current)
    inputRef.current.focus(); //focused data
  });

const onDelete =(id)=>{
    setArr(arr.filter((data)=> data.id !== id)) //update array not deleteing
}

const onComplete =(id)=>{
    let complete = arr.map((list)=>{
        if(list.id === id){
            return({...list, status : !list.status })
        }
        return list;
    })
    setArr(complete)
}

const onEdit =(id)=>{
  const edit = arr.find((data)=>data.id === id)
  // console.log('edit id'+edit.list )
  setInput(edit.list)
  setEditID(edit.id)
  console.log(edit)
}

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          ref={inputRef}
          placeholder="Enter your todo"
          className="form-control"
          onChange={(event) => setInput(event.target.value)}
        />
        {/* todisplay */}
        {input}
        <button onClick={addTodo}>{editId ? 'EDIT': 'ADD'}  </button>
      </form>
      <div className="list">
        <ul>
          {/* 
                <li className='form-control'>First</li>
                <li className='form-control'>Second</li>
                <li className='form-control'>Third</li> 
                */}
          {/* // diplay using map()
                { arr.map((num)=>num) } 
                 */}

          {arr.map((todo) => (
            <li className="list-items">
              <div className="list-item-list" id={todo.status ? 'list-item' : ''}>{todo.list}</div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={()=>onComplete(todo.id)}
                />
                <FiEdit 
                className="list-item-icons"
                 id="edit" 
                 title="Edit" 
                 onClick={()=>onEdit(todo.id)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(todo.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* 
        {car.colour}<br/>
        {car.name}<br/>
        {car.year}<br/>
        spread operator ...var 
        <button onClick={()=>setCar({...car,colour:'blue'})}>Change colour</button> 
        */}
    </div>
  );
}

export default Todo;
