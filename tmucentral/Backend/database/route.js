const router = require('express').Router();
const _user = require('./api_endpoints/user');
const _ad = require('./api_endpoints/ad');
const _review = require('./api_endpoints/review');

router
    .get('/getUsers', _user.getUsers)
    .post('/postUser', _user.postUser)
    .post('/searchUser', _user.searchUser)
    .get('/users/id/:email', _user.getUserEmail)
    .get('/users/id/:id', _user.getUserID)
    .put('/users/id/:id', _user.putUserID)
    .patch('/users/id/:id', _user.patchUser)
    .delete('/users/id/:id', _user.deleteUser)

    .get('/getAds', _ad.getAds)
    .post('/postAds', _ad.postAds)
    .patch('/ads/ads/:id', _ad.patchAds)
    .post('/searchAd', _ad.searchAd)
    .get('/ads/tags/:tags', _ad.getAdTags)

    .get('/getReview', _review.getReview)
    .post('/postReview', _review.postReview)
    .patch('/reviews/reviews/:id', _review.patchReview)

module.exports = router;
