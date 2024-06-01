
const {User} = require('../config/config');

describe('Firebase function', () => {
  it('write doc to Firestore', async () => {
    const testDoc = User.doc('testData');

    await testDoc.set({ testField: 'testValue' });

  });
  it('read doc to firebase', async () => {
    const testDoc = User.doc('testData');


    const doc = await testDoc.get();
    expect(doc.exists).toBe(true);
    expect(doc.data().testField).toBe('testValue');
  });
  it('delete doc to firebase', async () => {
    const testDoc = User.doc('testData');

    await testDoc.delete();

  
    const doc = await testDoc.get();
    expect(doc.exists).toBe(false);
  });
});
