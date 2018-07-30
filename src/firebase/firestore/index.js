import { database as db } from '../initialization';

export const getChallenges = async userId => {
  const collection = await db
    .collection('challenges')
    .where('user', '==', userId)
    .get();
  return collection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const getChallenge = async challengeId => {
  const challengeDoc = await db
    .collection('challenges')
    .doc(challengeId)
    .get();
  const challenge = challengeDoc.data();
  return {
    ...challenge,
    startDate: challenge.startDate && challenge.startDate.toDate(),
    endDate: challenge.endDate && challenge.endDate.toDate(),
    id: challengeDoc.id,
  };
};

export const getEntries = async challengeId => {
  const collection = await db
    .collection('challenges')
    .doc(challengeId)
    .collection('entries')
    .orderBy('time', 'desc')
    .get();
  return collection.docs.map(doc => ({
    ...doc.data(),
    time: doc.data().time.toDate(),
    id: doc.id,
  }));
};

export const saveNewChallenge = (userId, challenge) =>
  db.collection('challenges').add({ ...challenge, user: userId });
