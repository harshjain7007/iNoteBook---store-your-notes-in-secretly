import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const intialNotes = []
  //  [
  //   {
  //     "_id": "6386cd8a3a96be7e433e00e81",
  //     "user": "63844005f4858c54fa3b68ea",
  //     "title": "Title",
  //     "description": "Description",
  //     "tag": "tagTag",
  //     "date": "2022-11-30T03:27:06.946Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6386cd8f3a96be7e433e00ea2",
  //     "user": "63844005f4858c54fa3b68ea",
  //     "title": "Title",
  //     "description": "Description",
  //     "tag": "tagTag",
  //     "date": "2022-11-30T03:27:11.977Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6386ce2621dea55d116410e93",
  //     "user": "63844005f4858c54fa3b68ea",
  //     "title": "Title",
  //     "description": "Description",
  //     "tag": "tagTag",
  //     "date": "2022-11-30T03:29:42.167Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6386d00e655ef53326e61ebe4",
  //     "user": "63844005f4858c54fa3b68ea",
  //     "title": "Title",
  //     "description": "Description",
  //     "tag": "tagTag",
  //     "date": "2022-11-30T03:37:50.871Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6386ce2621dea55d116410e95",
  //     "user": "63844005f4858c54fa3b68ea",
  //     "title": "Title",
  //     "description": "Description",
  //     "tag": "tagTag",
  //     "date": "2022-11-30T03:29:42.167Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6386d00e655ef53326e61ebe6",
  //     "user": "63844005f4858c54fa3b68ea",
  //     "title": "Title",
  //     "description": "Description",
  //     "tag": "tagTag",
  //     "date": "2022-11-30T03:37:50.871Z",
  //     "__v": 0
  //   }
  // ]

  const [notes, setNotes] = useState(intialNotes)


   /////  ====  get All notes  //  write after addNote and editNote function
  const getAllNotes = async () => { 
    // Todo Api Call
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }



  // Add Note
  const addNote = async (title, description, tag) => { // we can send with the header bcz of jo user hai uske acc mehi notes saved kerna hai  
    // Todo Api Call
    const response = await fetch(`${host}/api/note/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });
    const note = await response.json()
    setNotes(notes.concat(note))
    // console.log(json)

    // console.log("adding a new note")
    // note = json

    // const note = {
    //   "_id": "6386d00e655ef53326e61ebe8",
    //   "user": "63844005f4858c54fa3b68eaad8",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2022-11-30T03:37:50.871Z",
    //   "__v": 0
    // }
    // setNotes(notes.concat(note))
  }

  // Delete Note
  const deleteNote = async (id) => {
    // Todo Api Call
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {  // directly browser se is server pe request ni kar sakte so we can install cors pakage in npm pakage 
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = response.json();
    console.log(json)


    console.log("deleting the note ", id)
    let newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // API call

    ///  search "fetch with headers" and MDN doc copy this code 
    // console.log(id, title, description, tag)
    console.log('edit note ')
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {  // directly browser se is server pe request ni kar sakte so we can install cors pakage in npm pakage 
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)

    let newNote = JSON.parse(JSON.stringify(notes))
    console.log(newNote, "new note")

    // Edit to logic a client  //  1st write this
    for (let index = 0; index < newNote.length; index++) {
      let element = newNote[index]
      if (element._id === id) {
        newNote[index].title = title
        newNote[index].description = description
        newNote[index].tag = tag
        break;
      }
    }
    setNotes(newNote) 
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
 
////////// ========  we can write always like voiler plate for using context
// import NoteContext from "./noteContext";
// const NoteState = (props) => {
//     return (
//         <NoteContext.provider>
//             {props.children}
//         </NoteContext.provider>
//     )
// }
// export default NoteState;


///// ======== example
// import NoteContext from "./noteContext";
// import { useState } from "react";

// const NoteState = (props) => {
//     const s1 = {
//         "name" : "harsh",
//         "age" : 23
//     }
//     const [state, setState] = useState(s1)
//     const update = () =>{
//         setTimeout(() => {
//             setState({
//                 "name" :  "nayan",
//                 "age" : 24
//             })
//         }, 1000);
//     }
//     return (
//         <NoteContext.Provider value={{state, update}}>
//             {props.children}
//         </NoteContext.Provider>
//     )
// }

// export default NoteState;
