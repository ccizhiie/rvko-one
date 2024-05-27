
const {User} = require('../config/config');

describe('Firebase fuction', () => {
  it('write doc to Firestore', async () => {
    const testDoc = User.doc('testData');

    // Write to Firestore
    await testDoc.set({ testField: 'testValue' });

  });
  it('read doc to firebase', async () => {
    const testDoc = User.doc('testData');

    // Read from Firestore
    const doc = await testDoc.get();
    expect(doc.exists).toBe(true);
    expect(doc.data().testField).toBe('testValue');
  });
  it('delete doc to firebase', async () => {
    const testDoc = User.doc('testData');

    await testDoc.delete();

    //delete doc to firebse 
    const doc = await testDoc.get();
    expect(doc.exists).toBe(false);
  });
});
