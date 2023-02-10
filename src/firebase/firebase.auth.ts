import {
  auth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  googleAuthProvider,
} from "./firebase.init";

export const startEmailLogin = (user, password) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, user, password).then(() => {
      resolve('Sign-in successful')
    }).catch((error) => {
      reject('An error happened')
    });
  })
};

export const startCreateUserWithEmailLogin = (user, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, user, password).then(() => {
      resolve('User creation successful')
    }).catch((error) => {
      reject('An error happened')
    });
  })
};

export const startGoogleLogin = () => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, googleAuthProvider).then((data) => {
      resolve(data)
    }).catch((error) => {
      reject('An error happened')
    });
  })
};

export const startLogout = () => {
  return new Promise((resolve, reject) => {
    signOut(auth).then(() => {
      resolve('Sign-out successful')
    }).catch((error) => {
      reject('An error happened')
    });
  })
};