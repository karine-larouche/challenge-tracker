import { database as db } from '../initialization';

export const getChallenges = (userId, onSuccess, onError) =>
  db
    .collection('challenges')
    .where('user', '==', userId)
    .onSnapshot(
      { includeMetadataChanges: true },
      snap => {
        if (!snap.metadata.hasPendingWrites) {
          onSuccess(
            Object.assign(
              {},
              ...snap.docs.map(doc => ({
                [doc.id]: {
                  ...doc.data(),
                  startDate:
                    doc.data().startDate && doc.data().startDate.toDate(),
                  endDate: doc.data().endDate && doc.data().endDate.toDate(),
                  id: doc.id,
                },
              })),
            ),
          );
        }
      },
      onError,
    );

export const getEntries = (challengeId, onSuccess, onError) =>
  db
    .collection('challenges')
    .doc(challengeId)
    .collection('entries')
    .orderBy('time', 'desc')
    .onSnapshot(
      snap =>
        onSuccess(
          snap.docs.map(doc => ({
            ...doc.data(),
            time: doc.data().time.toDate(),
            id: doc.id,
          })),
        ),
      onError,
    );

export const saveNewChallenge = (userId, challenge) =>
  db.collection('challenges').add({ ...challenge, user: userId });

export const saveNewEntry = (challengeId, entry) =>
  db
    .collection('challenges')
    .doc(challengeId)
    .collection('entries')
    .add(entry);

export const deleteEntry = (challengeId, entryId) =>
  db
    .collection('challenges')
    .doc(challengeId)
    .collection('entries')
    .doc(entryId)
    .delete();
