import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { FirebaseApp, FirebaseModuleOptions } from './firebase.types';
import { FIREBASE_INSTANCE_TOKEN } from './firebase.constants';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import { getFirestore } from 'firebase-admin/firestore';

const getFirebaseAppInstance = (options: FirebaseModuleOptions) => {
  const { credential, ...rest } = options;
  return initializeApp({
    credential: cert(options.credential),
    ...rest,
  });
};

@Global()
@Module({})
export class FirebaseModule {
  static forRoot(options: FirebaseModuleOptions): DynamicModule {
    const firebaseAdmin = getFirebaseAppInstance(options);
    const firebaseProvider: Provider<FirebaseApp> = {
      provide: FIREBASE_INSTANCE_TOKEN,
      useValue: {
        auth: getAuth(firebaseAdmin),
        firestore: getFirestore(firebaseAdmin),
      },
    };

    return {
      providers: [firebaseProvider],
      module: FirebaseModule,
      exports: [firebaseProvider],
    };
  }
}
