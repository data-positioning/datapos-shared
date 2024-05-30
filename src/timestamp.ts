// Dependencies - Vendor
import { Timestamp } from 'firebase/firestore'; // See: https://firebase.google.com/docs/reference/js/firestore_.timestamp.md.

// Constants
export const DefaultTimestamp: Timestamp = new Timestamp(0, 0);

// Facilitators - Convert Milliseconds to Timestamp
export const convertMillisecondsToTimestamp = (milliseconds: number) => Timestamp.fromMillis(milliseconds);

// Facilitators - Get Current TimeStamp
export const getCurrentTimestamp = () => Timestamp.now();
