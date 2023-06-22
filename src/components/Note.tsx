
interface NoteProps {
  content: string,
  remove: (arg: number) => void,
  id: number
}




const Note = ({content, remove, id}: NoteProps) => {
    const handlerDelete = () => {
        remove(id);
    }
    

  return (
    <div className="note">
        <a href="#/" className="note-remove" onClick={handlerDelete}>
        <span className="material-icons">close</span>
        </a>
        <pre>{content}</pre>
  </div>
  );
};

export default Note