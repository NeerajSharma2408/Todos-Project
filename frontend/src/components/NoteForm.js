import classes from "./NoteForm.module.css";
import NotesList from "./NotesList";
import { Form, json, redirect, useLoaderData} from "react-router-dom";

function MakeNote() {

    const notes = useLoaderData();
    
    return <>
        <Form method="post" action="/">
            <div className={classes.mainDiv}>
                <input 
                    name="title" 
                    id="title"
                    type="text" 
                    placeholder="Enter Note Title" />
                <input 
                    name="desc" 
                    id="desc"
                    type="text" 
                    placeholder="Enter Note" />
                <button type="submit" name="intent" value="post">Submit</button>
            </div>
        </Form>
        <NotesList notes={notes} />
    </>
}

export default MakeNote;

export async function loader(){
    const response = await fetch('http://localhost:5001');
    
    if(!response.ok){
        console.log("no value");
        return {};
    }
    const data = await response.json();
    return data;
}

export async function postAndDeleteAction({request, params}){

    const data = await request.formData();

    if(data.get('intent') === 'post'){
        const noteData = {
            title: data.get('title'),
            desc: data.get('desc')
        };
    
        const response = await fetch("http://localhost:5001",{
            method: "POST",
            // mode: "cors", // not necessary
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(noteData)
        });
    
        if(!response.ok){
            throw json({message: 'could not save event'}, {status: 500})
        }
    
        document.getElementById("title").value = "";
        document.getElementById("desc").value = "";

    }else{

        const sendData = {
            id: data.get('id')
        };

        const response = await fetch("http://localhost:5001", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendData)
        });

        if(!response.ok){
            throw json({message: 'could not delete event'}, {status: 500});
        }
    }


    return redirect('/');
}



