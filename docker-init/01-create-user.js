db = db.getSiblingDB('omidar');
db.createUser({
  user: 'mansour',
  pwd: '12345',
  roles: [{ role: 'readWrite', db: 'omidar' }]
});
