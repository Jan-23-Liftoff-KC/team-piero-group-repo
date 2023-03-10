import { db } from "./firebase.init";
import { ref, set, onValue, remove, update } from "firebase/database";

class FireBaseService {
    // takes a collection_name property and a collection payload to store a new or completely override an existing collection in firebase
    createCollection(collection_name: string, payload: any) {
      return new Promise((resolve, reject) => {
        const collectionRef = ref(db, '/' + collection_name)
        set(collectionRef, payload) 
          .then(() => {
            resolve('new collection' + collection_name + ' created successfully!')
          })
          .catch(() => {
            reject('error setting ' + collection_name + ' data to db');
          });
      })
    }
    // takes a collection_name property and returns that collection from firebase
    readCollection(collection_name: string) {
      return new Promise((resolve, reject) => {
        const collectionRef = ref(db, '/' + collection_name)
        onValue(collectionRef, (snapshot) => {
          const data = snapshot.val();
          if(data) {
              resolve(data);
          } else {
              reject('error fetching ' + collection_name + ' data from db');
          }
        });
      });
    }
    // takes a collection_name property and child_id to identify the child data that needs to be updated in an existing collection. Updates child node with payload to store a new or augment an existing collection child node in firebase
    updateCollection(collection_name: string, child_id: number, payload: any) {
      return new Promise((resolve, reject) => {
        const collectionChildRef = ref(db, '/' + collection_name + '/' + child_id)
        update(collectionChildRef, payload)
          .then(() => {
            resolve(`${collection_name}/${child_id} data updated successfully!`)
          })
          .catch(() => {
            reject('error updating ' + collection_name + ' data to db');
          });
      })
    }
    // takes a collection_name property and deletes that collection from firebase
    deleteCollection(collection_name: string) {
      return new Promise((resolve, reject) => {
        const collectionRef = ref(db, '/' + collection_name)
        remove(collectionRef)
        .then(() => {
          resolve(collection_name + ' collection deleted successfully!')
        })
        .catch(() => {
          reject('error deleting ' + collection_name + ' collection from db');
        });
      });
    }
}

export const firebase_service = new FireBaseService();