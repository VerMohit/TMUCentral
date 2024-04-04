const router = require('express').Router();
const _user = require('./api_endpoints/user');
const _ad = require('./api_endpoints/ad');
const _review = require('./api_endpoints/review');

router
    .get('/getUsers', _user.getUsers) // Security issue for printing all Users
    .post('/postUser', _user.postUser)
    .post('/searchUser', _user.searchUser)
    .get('/getUserById/:id', _user.getUserID)
    //.put('/putUserById/:id', _user.putUserID) // Very Dangerous - Use Patch instead
    .patch('/patchUser/:id', _user.patchUser)
    .delete('/deleteUser/:id', _user.deleteUser)

    .get('/getAds', _ad.getAds)
    .post('/postAds', _ad.postAds)
    .patch('/patchAd/:id', _ad.patchAds)
    .post('/searchAd', _ad.searchAd)
    .post('/searchAds', _ad.searchAds) 
    // .get('/ads/tags/:tags', _ad.getAdTags) // no longer in use
    .delete('/deleteAd/:id', _ad.deleteAd)
    // To get data about a specific ad
    .get('/getAdById/:id', _ad.getAdById)


    // Review Table no longer in use
    // .get('/getReview', _review.getReview)
    // .post('/postReview', _review.postReview)
    // .patch('/reviews/reviews/:id', _review.patchReview)

module.exports = router;
