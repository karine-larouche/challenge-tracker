import { database as db } from '../initialization';

export const getChallenges = async userId => {
  const collection = await db
    .collection('challenges')
    .where('user', '==', userId)
    .get();
  return collection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const getChallenge = async challengeId => {
  const doc = await db
    .collection('challenges')
    .doc(challengeId)
    .get();
  return doc.data();
};

export const saveNewChallenge = (userId, challenge) =>
  db.collection('challenges').add({ ...challenge, user: userId });
