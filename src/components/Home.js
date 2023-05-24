import React, { useEffect, useState } from 'react'

import appFirebase from '../credenciales'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc, setDoc, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore'

const auth = getAuth(appFirebase)
const db = getFirestore(appFirebase)//consigue firestore para CRUD

const Home = ({ emailUser }) => {

  const valorInicial = {
    name: '',
    age: '',
    job: ''
  }

  // variables de estado
  const [user, setUser] = useState(valorInicial) //hook -> los campos del objeto de inicializan a vacío. Se rellenarán después para llevarlos a firebase
  const [lista, setLista] = useState([])
  const [subId, setSubId] = useState('')

  const capturarInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value }) //trae copia de user y por cada nombre, almacena el valor del target
    //gracias a poner el campo entre [], modificará el campo que coincida.
  }

  const guardarDatos = async (e) => {
    e.preventDefault(); //para no recargar página
    //console.log(user);

    if (subId === '') {
      try {
        //añadir user a firebase -> seguir documentación oficial
        await addDoc(collection(db, 'usuarios'), {
          ...user //dar copia de user -> como DTO
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      await setDoc(doc(db, 'usuarios', subId), { ...user })
    }


    setUser({ ...valorInicial }) //para dejar los campos vacíos de nuevo
    setSubId('')
  }

  //función para renderizar la lista de usuarios
  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'usuarios')) //trae colección
        const docs = []
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id }) //unimos el id del doc con sus campos -> cosas de firebase
        })
        setLista(docs)
      } catch (error) {
        console.log(error)
      }
    }
    getLista()
  }, [lista]) //para poder montar el componente y renderizarlo cada vez que haya cambios en ella


  //DELETE
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, 'usuarios', id))
  }

  //UPDATE
  const getOne = async (id) => {
    try {
      const docRef = doc(db, "usuarios", id)
      const docSnap = await getDoc(docRef)
      setUser(docSnap.data())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (subId !== '') {
      getOne(subId)
    }
  }, [subId]) //dice si va o no a renderizarse cuando subId tenga cambios o contenido

  return (
    <div className='container'>
      <p>Welcome, <strong>{emailUser}</strong></p>
      <button className='btn btn-primary' onClick={() => signOut(auth)}>
        Log out
      </button>

      <hr />
      <div className='row'>
        {/* formulario */}
        <div className='col-md-4'>
          <h3 className='text-center mb-3'>Add user</h3>
          <form onSubmit={guardarDatos}>
            <div className='card card-body'>
              <div className='form-group'>
                <input type='text' name='name' className='form-control mb-3' placeholder='Add username' onChange={capturarInputs} value={user.name}></input>
                <input type='text' name='age' className='form-control mb-3' placeholder="Add user's age" onChange={capturarInputs} value={user.age}></input>
                <input type='text' name='job' className='form-control mb-3' placeholder="Add user's job" onChange={capturarInputs} value={user.job}></input>
              </div>

              <button className='btn btn-primary'>
                {subId === '' ? 'Save': 'Update'}
              </button>
            </div>
          </form>
        </div>

        {/* lista de usuarios */}
        <div className='col-md-8'>
          <h2 className='text-center mb-5'>Users list</h2>

          <div className='container card'>
            <div className='card-body'>
              {
                lista.map(list => (
                  <div key={list.id}>
                    <p>Name: {list.name}</p>
                    <p>Age: {list.age}</p>
                    <p>Job: {list.job}</p>

                    <button className='btn btn-danger' onClick={() => deleteUser(list.id)}>Delete</button>

                    <button className='btn btn-success m-1' onClick={() => setSubId(list.id)}>Update</button>

                    <hr />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home