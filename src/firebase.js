// ...existing code...
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Use env vars in production instead of hardcoding
const firebaseConfig = {
  apiKey: "AIzaSyCfDLrYpZDzeRAzLr2m04PcNsgmTvIU8Ok",
  authDomain: "ai-career-counsellor-fe82d.firebaseapp.com",
  projectId: "ai-career-counsellor-fe82d",
  storageBucket: "ai-career-counsellor-fe82d.appspot.com", // corrected
  messagingSenderId: "608534935955",
  appId: "1:608534935955:web:9e33e3c13fa001c0425066",
  measurementId: "G-M8ZBWBDYBD"
};

const app = initializeApp(firebaseConfig);

// analytics may fail or be unavailable in some environments (SSR / tests)
let analytics;
try {
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
} catch (e) {
  // ignore analytics errors
}

// Export auth and provider for use in Login component
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// ...existing code...