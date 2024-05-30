// Dependencies - Vendor
import { Timestamp as FirebaseTimestamp } from 'firebase/firestore'; // See: https://firebase.google.com/docs/reference/js/firestore_.timestamp.md.

// Interfaces/Types - Timestamp
export type Timestamp = FirebaseTimestamp;

// Constants
export const DefaultTimestamp: Timestamp = new FirebaseTimestamp(0, 0);

// Facilitators - Convert Milliseconds to Timestamp
export const convertMillisecondsToTimestamp = (milliseconds: number): Timestamp => FirebaseTimestamp.fromMillis(milliseconds);

// Facilitators - Get Current Timestamp
export const getCurrentTimestamp = (): Timestamp => FirebaseTimestamp.now();
