import { Inject } from '@nestjs/common';
import { FIREBASE_INSTANCE_TOKEN } from '../firebase.constants';

export const InjectFirebase = () => Inject(FIREBASE_INSTANCE_TOKEN);
