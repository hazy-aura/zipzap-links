const {handleGenerateNewShortURL,handleGetAnalytics} = require("../controllers/url");
const express = require("express");
const router = express.Router();


router.post('/',handleGenerateNewShortURL);
router.get('/analytics/:shortID',handleGetAnalytics);



module.exports = router;