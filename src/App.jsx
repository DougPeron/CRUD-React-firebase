import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, doc} from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import "./assets/style/styles.css"

import { useEffect, useState } from "react";
const firebaseConfig = initializeApp( {
  apiKey: "AIzaSyB6srD44Pn0LH2ZckB3Ppwhjbw8A4XJxNE",
  authDomain: "react-firebase-81678.firebaseapp.com",
  projectId: "react-firebase-81678",
  storageBucket: "react-firebase-81678.appspot.com",
  messagingSenderId: "535236207987",
  appId: "1:535236207987:web:8c4ca5cb2775a402e01106",
  measurementId: "G-KV1YPCLNTK"
});

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState ();
  const [usuarios, setUsuarios] = useState([]);

  const database = getFirestore(firebaseConfig);
  const collectRef = collection(database, 'usuarios');

  async function handleCreateUser(){
    const user = await addDoc(collectRef, {name, email, idade});
  }
  async function deleteUser(userId){
    const userDoc = doc(database, "usuarios", userId);
    await deleteDoc(userDoc);
  }
  useEffect(()=> {
    const getUsers = async () => {
      const data = await getDocs(collectRef);
      setUsuarios(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      
    };
    getUsers();
  },[handleCreateUser])

  return (
    <div className="m-4">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Label>Nome</Form.Label>
            <Form.Control type="email" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" >
            <Form.Label>Idade</Form.Label>
            <Form.Control type="number" placeholder="Idade" value={idade} onChange={(e) => setIdade(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" onClick={handleCreateUser}>
            Cadastrar
        </Button>
      </Form>

      <Table className="mt-4" striped bordered hover>
        <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Idade</th>
          
        </tr>
        </thead>
        <tbody>
        {usuarios.map((user) =>{
          return(
            <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.idade}</td>
            <td><button onClick={()=> deleteUser(user.id)}>Deletar</button></td>
          </tr>
          )
        })}
        </tbody>
      </Table>
      
    </div>
    
    
  );
}

export default App;
