import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDEzeUJVNlUISblkjNeCftzfoQec6yeaVE',
  authDomain: 'foot-mints-on-the-proon-0.firebaseapp.com',
  databaseURL: 'https://foot-mints-on-the-proon-0.firebaseio.com',
  projectId: 'foot-mints-on-the-proon-0',
};

firebase.initializeApp(firebaseConfig);

const initializeFirebase = store => {
  firebase.auth().onAuthStateChanged(store.dispatch.auth.setUser);
};

const authRef = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.firestore();

const settings = { timestampsInSnapshots: true };
database.settings(settings);

export { initializeFirebase, authRef, provider, database };
