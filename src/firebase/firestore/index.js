import { database as db } from '../initialization';

export const getChallenges = async userId => {
  const collection = await db
    .collection('challenges')
    .where('user', '==', userId)
    .get();
  return collection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};
