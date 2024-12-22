import React , {useRef, useState} from 'react';
import './Product.css';
import * as fabric from 'fabric'; // browser
//import { StaticCanvas } from 'fabric/node'; // node
import tshirt from "../../images/shirt.png"
import sweater from "../../images/sweater.png";
import axios from 'axios';

function Product(props) {

    const [initialCost , setInitialCost] = useState(16.95);
    const [prodUrl, setProdurl] = useState(tshirt);
    const [product, setProduct] = useState("shirt");
    const [colorCost, setColorcost] = useState(0);
    const[imageCost, setImagecost] = useState(0);
    const [colorChoice, setColorChoice] = useState("black");
    const [textClicked , setTextClicked] = useState(false);
    const [textCost, setTextcost] = useState(0);

    const canvasref = useRef();
    const canvasTextref = useRef();
    const textRef = useRef();


    const handleChange = (event) => {
        setProduct(event.target.value);
        if(event.target.value==="sweater"){
            console.log("called");
            setProdurl(sweater);
            setInitialCost(28.95);
        }
        if(event.target.value==="shirt"){
            setProdurl(tshirt);
            setInitialCost(16.95);
        }
      };    

    const handleAddText = (e) => {
        setTextClicked(true);
        if((textRef.current.value).length>8){
            setTextcost(5);
        }

        const textCanvas = new fabric.Canvas(canvasTextref.current);
        textCanvas.add(new fabric.Text(textRef.current.value, { 
            fontFamily: 'Delicious_500', 
            left: 100, 
            top: 100,
           fill: 'yellow'
          }));
    }

    const handleAddImage = (e) => {
        setImagecost(10);
        const canvas = new fabric.Canvas(canvasref.current);
        let imgObj = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(imgObj)
        reader.onload = (e) => {
          let imageUrl = e.target.result
          let imageElement = document.createElement("img")
          imageElement.src = imageUrl
          imageElement.onload = function () {
            let image = new fabric.Image(imageElement)
            image.set({
              left: 10,
              top: 0,
              scaleY: 0.1,
              scaleX: 0.1,
            })
            canvas.add(image)
            canvas.centerObject(image)
            canvas.setActiveObject(image)
          }
        }
      }
    
    const bgtoblack = () => {
        setColorChoice("black");
        setColorcost(0);
    }
    const bgtobwhite = () => {
        setColorChoice("white");
        setColorcost(0);
    }
    const bgtogreen = () => {
        setColorChoice("green");
        if(product ==="shirt"){
            setColorcost(2);
        }
        if(product ==="sweater"){
            setColorcost(4);
        }
    }
    const bgtored = () => {
        setColorChoice("red");
        if(product ==="shirt"){
            setColorcost(2);
        }
        if(product ==="sweater"){
            setColorcost(4);
        }
    }

    const placeOrder = async() => {

        let totalCost = initialCost+colorCost+imageCost+textCost;
        let date = new Date();
        let time = date.toLocaleString("en-us") + "";
        let userId = 1;

        let order = {
            userId : userId,
            orderDate : time,
            orderPrice: totalCost,
        }

        try {
            const response = await axios.post(
              "http://localhost:3001/add-order",
              order
            );
            alert(response.data);
            //console.log(response);
          } catch (error) {
            console.error("Error posting data:", error);
          }


    }

    let myStyle = {"backgroundImage": `url(${prodUrl})`,
                   "backgroundColor": colorChoice,
                   "position":"relative",
                   "display":"flex",
                   "flexDirection":"column",
                   "justifyContent":"center",
                   "height":"400px",
                   "width":"400px",
                   "backgroundSize":"100% 100%"
                }

  return (
    <>
    <label>
    What do you want to buy ?
    <br></br>
    <br></br>
    <select value={product} onChange={handleChange}>
    <option value="shirt">T-Shirt</option>
    <option value="sweater">Sweater</option>
    </select>
    </label>
    <hr/>
    <hr/>
    <div className='row'>
    <div className='col-lg-6' style={myStyle}>
    <canvas
        style={{
          position: "absolute",
          top: "40%",
          left: "40%",
        }}
        ref={canvasTextref}
      />    
    <canvas
        style={{
          position: "absolute",
          top: "40%",
          left: "40%",
        }}
        ref={canvasref}
      />
    </div>
    <div className='card bg-light container col-lg-6'>
        <h4 className='text-center'> Customizations </h4>
        <hr></hr>
        <h4>Change color</h4>
        <hr></hr>
        <div className='product-color'> 
           <button><div className='color-tile' onClick={bgtoblack} style={{backgroundColor: "black", color: "white"}}>black</div></button>
           <button><div className='color-tile' onClick={bgtobwhite} style={{backgroundColor: "white"}}>white</div></button>
           <button><div className='color-tile' onClick={bgtogreen} style={{backgroundColor: "green"}}>green</div></button>
           <button><div className='color-tile' onClick={bgtored} style={{backgroundColor: "red"}}>red</div></button>
        </div>
        <br></br>
        <br></br>
        <hr></hr>
        <h4>Insert Text</h4>
        <i>Free upto 8 characters, $5 for more</i>
        <input  type='text' ref={textRef} maxLength={16} className='form-control form-control-sm' placeholder='custom text'/>
        {!textClicked && <button onClick={handleAddText}>Add Text</button>}
        <hr/>
        <hr/>
        <h4>Upload Image</h4>
        <i>For extra 10$</i>
        <div className='form-group'>
            <input type='file' className='form-control form-control-sm' onChange={handleAddImage}/>
        </div>
        <hr></hr>
        <h4> Total Cost- {initialCost+colorCost+imageCost+textCost} </h4>
        <hr></hr>
        <button style={{backgroundColor: "beige"}} onClick={placeOrder}>Place Order</button>
    </div>
   </div>
   </>
  )
}

export default Product