import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyD_6-aX9WyU_zkH_Oz8Whx_MQcrJRjqktc",
    authDomain: "shopping-test-fd353.firebaseapp.com",
    databaseURL: "https://shopping-test-fd353-default-rtdb.firebaseio.com",
    projectId: "shopping-test-fd353",
    storageBucket: "shopping-test-fd353.appspot.com",
    messagingSenderId: "750414614250",
    appId: "1:750414614250:web:373951ec15414dc7845193",
    measurementId: "G-2C079BDZK3"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const createUserProfile = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const {displayName,email} = userAuth;
    const timestamp = new Date();
    const { photoURL } = auth.currentUser

    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        photoURL,
        ...additionalData
      })
    }catch (err) {
      console.log('error creating user',err.massage);
    }
  }
  return userRef;
}

export default firebase;

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      unsubscribe();
      resolve(userAuth);
    },reject);
  });
};

// export const covertCollectionsSnapshotToMap = (collections) =>{
//   const transformedCollection = collections.doc.map(doc =>{
//     const {title,items} = doc.data();
//     return {
      
//     }
//   })
// }