const express = require('express');
let router = express.Router();

let users = [{
  "id": "1",
  "email": "liam.walters@example.com",
  "gender": "male",
  "phone_number": "0438-376-652",
  "birthdate": 826530877,
  "location": {
    "street": "9156 dogwood ave",
    "city": "devonport",
    "state": "australian capital territory",
    "postcode": 7374
  },
  "username": "biglion964",
  "password": "training",
  "first_name": "liam",
  "last_name": "walters",
  "title": "mr",
  "picture": "men/50.jpg"
}];
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json(users);
});
router.get('/:id', (req, res, next) => {
  let user = users.find(u => u.id == req.params.id)
  if (user)
    res.json(user)
  else
    next()
});

module.exports = router;