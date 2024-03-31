import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const initializeFirebaseAdmin = async () => {
  try {
    if (!getApps().length) {
      const response = await fetch(
        process.env.FIREBASE_APPLICATION_CREDENTIALS as string,
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch credentials: ${response.statusText}`);
      }
      const serviceAccount = await response.json();

      initializeApp({
        credential: cert(serviceAccount),
      });
    }

    const db = getFirestore();
    return {
      db,
    };
  } catch (error) {
    throw error;
  }
};
