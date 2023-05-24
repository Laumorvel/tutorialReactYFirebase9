import React, { useState } from 'react'
import Uno from '../images/eviden1.png'
import Dos from '../images/eviden4.jfif'
import Tres from '../images/eviden3.jpg'
import appFirebase from '../credenciales'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
const auth = getAuth(appFirebase);

const Login = () => {
  const [registro, setRegistro] = useState(false)
  //hook de react que se comprueba durante el ciclo de vida para saber qué valor dar a la constante
  const handlerSubmit = async(e)=>{
    e.preventDefault(); {/*Impide que se recargue la página al clicar en submit para que sea una web dinámica. Capturamos lo que llega de los campos de texto */}
    const email = e.target.email.value;
    const password = e.target.password.value;

    if(registro){
      await createUserWithEmailAndPassword(auth, email, password)
    }
    else{
      await signInWithEmailAndPassword(auth, email, password);
    }
  }

  return (
    <div className='row container p-4'>
      <div className='col-md-8'>
        <div id="carouselExample" class="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Uno} className='tamano-imagen'></img>
            </div>
            <div className="carousel-item">
              <img src={Dos} className='tamano-imagen'></img>
            </div>
            <div className="carousel-item">
              <img src={Tres} className='tamano-imagen'></img>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* <div>En esta sección irá el formulario</div> */}
      <div className='col-md-4'>
        <div className='mt-5 ms-5'>
          <h1>{registro ? 'Sign up' : 'Login'}</h1>
          <form onSubmit={handlerSubmit}>
            <div className='mb-3'>
              <label>Email address</label>
              <input type='email' className='form-control' placeholder='Write email' id='email' required/>
            </div>

            <div className='mb-3'>
              <label>Password</label>
              <input type='password' className='form-control' placeholder='Write password' id='password' required/>
            </div>

            <button className='btn btn-primary' type='submit'>
              {registro ? 'Sign up' : 'Login'}
            </button>
          </form>

            <div className='form-group'>
              <button className='btn btn-secondary mt-4 form-control' onClick={()=>setRegistro(!registro)}>{/*Revierto valor de registro*/}
                {registro ? 'Do you already have an account? Log in' : 'Sign up here'}
              </button>
            </div>

        </div>
      </div>

    </div>

  )
}

export default Login