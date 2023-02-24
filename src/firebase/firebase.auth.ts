import {
  auth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  googleAuthProvider,
} from "./firebase.init";

export const startEmailLogin = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      resolve({ message: 'Sign-in successful', data: userCredentials })
    }).catch((error) => {
      reject({ message: 'An error happened', error })
    });
  })
};

export const startCreateUserWithEmailLogin = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      resolve({ message: 'User creation successful', data: userCredentials })
    }).catch((error) => {
      reject('An error happened')
    });
  })
};

export const startGoogleLogin = () => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, googleAuthProvider).then((userData) => {
      resolve({ message: 'Google login successful', data: userData })
    }).catch((error) => {
      reject('An error happened')
    });
  })
};

export const startLogout = () => {
  return new Promise((resolve, reject) => {
    signOut(auth).then((data) => {
      resolve({ message: 'Sign-out successful', data })
    }).catch((error) => {
      reject('An error happened')
    });
  })
};