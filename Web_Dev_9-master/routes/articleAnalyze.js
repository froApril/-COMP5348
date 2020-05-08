const express =require('express');
const controller =require('../controllers/articleAnalyzeHandler');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const router = new express.Router();

router.get('/', controller.default);
router.post('/revision/most', urlencodedParser, controller.setRevision_High);
router.post('/revision/least', urlencodedParser, controller.setRevision_Low);
router.get('/history/most', urlencodedParser, controller.gethistory_H);
router.get('/history/least', urlencodedParser, controller.gethistory_L);
router.get('/User/most', urlencodedParser, controller.getUserNum_H);
router.get('/User/least', urlencodedParser, controller.getUserNum_L);
router.get('/title/list', urlencodedParser, controller.getDistinctTitlesList);
router.post('/title/total', urlencodedParser, controller.titleTotalRevisions);
router.post('/title/authors', urlencodedParser, controller.articleTopAuthors);
router.get('/revision/update/:title', urlencodedParser, controller.update);

router.get('/overall/pie', urlencodedParser, controller.userPie);
router.get('/overall/bar', urlencodedParser, controller.userBar);
router.post('/user/bar',urlencodedParser, controller.YearlyUserBar);

router.post('/individual/pie', urlencodedParser, controller.individualPie);
router.post('/individual/bar', urlencodedParser, controller.articleYearBar);
router.post('/author/titles', urlencodedParser, controller.authorTitleStats);
//router.post('/author/timestamps', urlencodedParser, controller.authorTitleTimestamps);
module.exports = router;
