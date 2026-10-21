import react,{useState,useMemo} from "react";
const UseMemoData =() =>{
    const[number,setNumber] = useState(8)
    const[count,setCount] = useState(0)
    const calculation = () =>{
        console.log('calcullation....')
        let square
        for(let i=0; i<=10000000; i++){
            square = number * number;
        }
        return square

    }
    const answer = useMemo(() => {
        return calculation()
    },[number])



   return(
    <>
    <h1> useMemo - {answer} </h1>
    <input type="text"  value={number} onChange={(e) => setNumber(e.target.value)}/>
    <button onClick={()=> setCount(count + 1)}>count - {count}</button>
    </>

   )

} 
export default UseMemoData