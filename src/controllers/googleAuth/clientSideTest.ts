// // src/controllers/googleAuth/clientSideTest.ts
// import firebase from "firebase/app";
// import "firebase/auth";

// // Initialize Firebase only once
// const firebaseConfig = {
//   apiKey: "AIzaSyDhvlL-...GdKGBYg", // your api key
//   authDomain: "gr-portal.firebaseapp.com",
//   projectId: "gr-portal",
//   storageBucket: "gr-portal.appspot.com",
//   messagingSenderId: "206763025534",
//   appId: "1:206763025534:web:e08c2e41f0127a1c51a533"
// };

// // Initialize Firebase if it hasn't been initialized already
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// async function googleSignIn() {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   try {
//     const result = await firebase.auth().signInWithPopup(provider);
//     const idToken = await result.user?.getIdToken();

//     // Send idToken to your Express server
//     if (idToken) {
//       fetch("http://localhost:3000/api/auth/google-signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ idToken }),
//       })
//         .then((response) => response.json())
//         .then((data) => console.log(data))
//         .catch((error) => console.error("Error:", error));
//     } else {
//       console.error("Failed to get ID token");
//     }
//   } catch (error) {
//     console.error("Google Sign-In Error:", error);
//   }
// }

// export { googleSignIn };
