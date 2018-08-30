import { database as db } from '../initialization';

export const getChallenges = (userId, onSuccess, onError) =>
  db
    .collection('challenges')
    .where('users', 'array-contains', userId)
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
  db.collection('challenges').add({ ...challenge, users: [userId] });

export const saveNewEntry = (userId, challengeId, entry) =>
  db
    .collection('challenges')
    .doc(challengeId)
    .collection('entries')
    .add({ ...entry, user: userId });

export const deleteEntry = (challengeId, entryId) =>
  db
    .collection('challenges')
    .doc(challengeId)
    .collection('entries')
    .doc(entryId)
    .delete();

export const saveUser = (userId, user) =>
  db
    .collection('users')
    .doc(userId)
    .set(user);

export const getUser = userId =>
  db
    .collection('users')
    .doc(userId)
    .get();

const getUsers = userIds => Promise.all(userIds.map(getUser));

export const getParticipants = (challengeId, onSuccess, onError) =>
  db
    .collection('challenges')
    .doc(challengeId)
    .onSnapshot(async snap => {
      const participantIds = snap.data().users;
      if (participantIds.length === 1) {
        onSuccess();
      } else {
        try {
          const participants = await getUsers(participantIds);
          onSuccess(
            Object.assign(
              {},
              ...participants.map(doc => ({
                [doc.id]: {
                  ...doc.data(),
                },
              })),
            ),
          );
        } catch (error) {
          onError(error);
        }
      }
    }, onError);
