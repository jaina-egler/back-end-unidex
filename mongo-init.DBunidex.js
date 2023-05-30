db.createUser({
  user: "root",
  pwd: "fslab",
  roles: [
    {
      role: "readWrite",
      db: "unidex"
    }
  ]
});
