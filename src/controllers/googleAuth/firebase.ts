import admin from "firebase-admin";
import serviceAccount from "../../../gr-portal-firebase-adminsdk-hhji0-eb405180b0.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
