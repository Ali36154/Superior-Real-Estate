import "react-toastify/dist/ReactToastify.css";
import {FcHome} from "react-icons/fc"
import './calculator'
import Form from "./form";
function Calculator(){
  return(
    <div className="calculator container" style={{maxWidth:"600", margin:"2rem auto"}}>
    <h1 className="display-1 my-5" style={{color:"White"}}><FcHome/>Mortage Estate Calculator</h1>
    <Form/>
    </div>
  )
}

export default Calculator;