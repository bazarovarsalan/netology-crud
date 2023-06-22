import  { useEffect, useState } from 'react'
import Note from './Note'
import CreateNote from './CreateNote';


interface note {
    content: string
    id: number,
}


const Notes = () => {
    const [notes, setNotes] = useState<note[]>([]);
    const [newNote, setNewNote] = useState(''); 
    const [error, setError] = useState('');
    let count = 0;
    

    useEffect(() => {
        fetchNotes();
    }, [notes])


    const fetchNotes = async() => {
        try {
          const res = await fetch('http://localhost:7070/notes')
          if (!res.ok) throw new Error('Something went wrong')
          const data = await res.json();
          setNotes(data.slice(0,3));
        } catch (err) {
            setError(error)
        }
    };


    const refresh = (event:React.MouseEvent) => {
        event.preventDefault();
        fetchNotes()
    }


    const handleChange = (value: string) => {
        setNewNote(value)
    }



    const createNote = async (event:React.MouseEvent) => {
        event.preventDefault();
        await fetch('http://localhost:7070/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: count, content: newNote }),
        }).then((_res) => {
            setNewNote('');
            count += 1;
        });
    }

    
    const removeNote = async(id:number) => {
        await fetch(`http://localhost:7070/notes/${id}`, {
            method: 'DELETE',
        })
    }


   
    useEffect(() => {
        const interval = setInterval(()=> {
            },1000)
        return ()=>clearInterval(interval)
       }, []);
        

  return (
        <>
    
         <div className="title">
            <h1>Notes</h1>
            <a href="#/" className="refresh" onClick={refresh}  >
            <span className="material-icons" >sync</span>
            </a>
        </div>
        <div className="notes-container">
            {notes && notes.map((note) => {
                return <Note key={note.id} content={note.content} remove={removeNote} id={note.id}/>}

            )}
        </div>
        <CreateNote value={newNote} onChange={handleChange} createNote={createNote}/>
    </>   
  )
}

export default Notes
