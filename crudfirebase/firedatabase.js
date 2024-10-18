// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9iDdqFnLFACBg3zH_BTy1ocIEahibVjs",
    authDomain: "ejemplo-crud-8c78a.firebaseapp.com",
    projectId: "ejemplo-crud-8c78a",
    storageBucket: "ejemplo-crud-8c78a.appspot.com",
    messagingSenderId: "809437790985",
    appId: "1:809437790985:web:5670aa02d4fc7ed02809d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const nameTablebd = "tareas";


//guardar datos
export const guardar = (Titulo, Descripcion) => {
    addDoc(collection(db, nameTablebd),{Titulo, Descripcion});
    
}

//listar datos
export const listar = () => getDocs(collection(db, nameTablebd))

export const cambios = (callback) => onSnapshot(collection(db, nameTablebd), callback);

export const borrar = (id) => deleteDoc(doc(db, nameTablebd, id));

export const busqueda = id => getDoc(doc(db, nameTablebd, id))

export const actualizar = (id, datosNuevos) => updateDoc(doc(db, nameTablebd, id), datosNuevos)
