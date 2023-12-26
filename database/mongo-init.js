db = db.getSiblingDB("mealapp");
db.createUser({
  user: "userName",
  pwd: "password",
  roles: [
    {
      role: "readWrite",
      db: "mealapp",
    },
  ],
});
