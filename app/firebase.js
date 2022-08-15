import * as firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCkW8GM9nDy0LagJZ4hIOoweiNblXBYqoI',
	authDomain: 'cornell-pickup.firebaseapp.com',
	databaseURL: 'https://cornell-pickup-default-rtdb.firebaseio.com',
	projectId: 'cornell-pickup',
	storageBucket: 'cornell-pickup.appspot.com',
	messagingSenderId: '531885655093',
	appId: '1:531885655093:web:499d6b77dfb38a34075d7c',
	measurementId: 'G-HB6V906YL2',
};

let app;

if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}
