import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCpTaQRHi3n8B1EIZ_GpU2ghtsuELYOENo",
    authDomain: "crwn-clothing-db-9d9da.firebaseapp.com",
    projectId: "crwn-clothing-db-9d9da",
    storageBucket: "crwn-clothing-db-9d9da.appspot.com",
    messagingSenderId: "991891482237",
    appId: "1:991891482237:web:d1217da12628b0e4153314"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }catch(error){
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
}