import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, doc} from "firebase/firestore";
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
    <div className="main">
      <div className="form">
      <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
      <br/>
      <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <br/>
      <input type="number" placeholder="Idade" value={idade} onChange={(e) => setIdade(e.target.value)}/>
      <br/>
      <button onClick={handleCreateUser}>Cadastrar</button>
    </div>
      <ul>
        {usuarios.map((user) =>{
        return(
          <div key={user.id}>
            <li>{user.name}</li>
            <li>{user.email}</li>
            <li>{user.idade}</li>
            <button onClick={()=> deleteUser(user.id)}>Deletar</button>
          </div>
        )
      })}
    </ul>
    </div>
    
    
  );
}

export default App;
