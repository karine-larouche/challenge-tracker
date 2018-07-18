import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDEzeUJVNlUISblkjNeCftzfoQec6yeaVE',
  authDomain: 'foot-mints-on-the-proon-0.firebaseapp.com',
  databaseURL: 'https://foot-mints-on-the-proon-0.firebaseio.com',
  projectId: 'foot-mints-on-the-proon-0',
};

firebase.initializeApp(firebaseConfig);

export const initializeFirebase = store => {
  firebase.auth().onAuthStateChanged(store.dispatch.auth.setUser);
};

export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
