import Firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCTcUA11w1aowgLwuQrxWBfozHPG8DKR8Q",
    authDomain: "virchat-2295d.firebaseapp.com",
    databaseURL: "https://virchat-2295d.firebaseio.com",
    projectId: "virchat-2295d",
    storageBucket: "virchat-2295d.appspot.com",
    messagingSenderId: "943234812027",
    appId: "1:943234812027:web:2efa9d885f147ab21f7ade"
};

const appConfig = Firebase.initializeApp(firebaseConfig);
export const db = appConfig.database();
export const auth = Firebase.auth();
export const time = Firebase.database.ServerValue.TIMESTAMP