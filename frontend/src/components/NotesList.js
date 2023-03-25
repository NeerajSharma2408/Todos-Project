import { useSubmit } from 'react-router-dom';
import classes from './DisplayNotes.module.css';

function NotesList({notes}){

    const submit = useSubmit();

    function deleteHandler(event){
        const prompt = window.confirm("Are you sure?");

        if(prompt){
            submit({id: event.target.value}, {method: "delete"})
        }
    }

    return <>
        <div className={classes.notesDiv}>
            <ul style={{listStyle: "none"}}>
                {
                    notes.map((note)=>{
                        return (<li key={note.id}>
                            <button onClick={deleteHandler} name="intent" value={note.id}>DELETE</button>
                            <p>Title: {note.title}</p>
                            <p>Description: {note.desc}</p>
                        </li>)
                    })
                }
            </ul>
        </div>
    </>
}

export default NotesList;

// export async function deleteAction({request, params}){

//     const data = await request.formData();

//     const sendData = {
//         id: data.get('id')
//     };

//     const response = await fetch("http://localhost:5001", {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(sendData)
//     });

//     if(!response.ok){
//         throw json({message: 'could not delete event'}, {status: 500});
//     }

//     return redirect('/');
// }