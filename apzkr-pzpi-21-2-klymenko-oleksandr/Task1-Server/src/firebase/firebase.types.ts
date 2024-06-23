import type {
  AppOptions,
  ServiceAccount,
  auth,
  firestore,
} from 'firebase-admin';

export type FirebaseModuleOptions = Omit<AppOptions, 'credential'> & {
  credential: string | ServiceAccount;
};

export type FirebaseApp = {
  auth: auth.Auth;
  firestore: firestore.Firestore;
};
