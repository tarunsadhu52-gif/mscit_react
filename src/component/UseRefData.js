import React,{useRef} from "react";

const UseRefData =() => {
    const firstName = useRef("")
    const LastName = useRef("")

    const handleSubit = () =>{
        if(!firstName.current.value || firstName.current.value==""){
            firstName.current.focus()
        }
        else if(!LastName.current.value || LastName.current.value==""){
            LastName.current.focus()
        }
            else{
            alert(firstName.current.value + " " + LastName.current.value)
        }


    }
    return(
        <>
        <input type="text" name="firstName" placeholder="firstName" ref={firstName}/>
        <input type="text" name="LastName" placeholder="LastName" ref={LastName}/>
        <button onClick={handleSubit}>Submit</button>
        </>

    )
}

export default UseRefData