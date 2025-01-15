const loginController = require('../controllers/loginController');

router.post('/register', loginController.registerUser); 

module.exports = router;    