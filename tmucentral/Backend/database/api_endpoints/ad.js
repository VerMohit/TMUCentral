const model = require('../model');

// Retreive all advertisements
exports.getAds = async(req, res) => {
    try{
        const result = await model.Ad.find();
        if(result == 0){
            res.status(404).send({'error': 'No results returned'});
        }
        else {
            res.status(200).send({'Ads': result});
        }
    }
    catch(err){
        res.status(500).send({'error': err.message});
    }
};


// Put product into DB
exports.postAds = async(req, res) => {
    try{
        const ad = new model.Ad(req.body);
        await ad.save();
        res.status(201).send({'Ads': ad});
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
};

// Update single or multiple fields associated with ad based on its ID
exports.patchAds = async(req, res) => {
    try{
        const result = await model.Ad.findOneAndUpdate(
            {_id: req.params.id}, 
            req.body, 
            {new: true}
        );
        console.log(result);
        res.status(201).send({'Ads': result});
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
};

// Find ad by title
// exports.searchAd = async(req, res) => {
//     try{
//         console.log(req.body.title);
//         const result = await model.Ad.find({title: req.body.title});
//         if(result == 0){
//             res.status(404).send({'error': 'No results returned'});
//         }
//         else {
//             res.status(200).send({'Ad': result});
//         }
//     }
//     catch(err){
//         res.status(500).send({'error': err.message});
//     }
// };

exports.searchAd = async(req, res) => {
    try{
        console.log(req.body.email);
        const result = await model.Ad.find({email: req.body.email});
        if(result == 0){
            res.status(404).send({'error': 'No results returned'});
        }
        else {
            res.status(200).send({'Ad': result});
        }
    }
    catch(err){
        res.status(500).send({'error': err.message});
    }
};



exports.searchAds = async(req, res) => {
    try{
        const {title,category, fromPrice, toPrice } = req.body;
        let query = {};
        if (title!=="null") query.title = title;
        if (category!=="null") query.category = category;
        if (fromPrice!=="-1") query.price = { $gte: parseFloat(fromPrice) };
        if (toPrice!=="-1") query.price = { ...query.price, $lte: parseFloat(toPrice) };

        console.log(req.body.email);
        const result = await model.Ad.find(query);
        if(result == 0){
            res.status(404).send({'error': 'No results returned'});
        }
        else {
            res.status(200).send({'Ad': result});
        }
    }
    catch(err){
        res.status(500).send({'error': err.message});
    }
};

// Retrieve all advertisements based on a series of tags
// sample endpoint: '/api/ads/tags/tag1,tag2,...,tagn
exports.getAdTags = async(req, res) => {
    try {
        const adTags = req.params.tags.split(',');
        // console.log("Tags:", prodTags); // Log prodTags to check its format
        const result = await model.Ad.find({ "tags.tag": { $in: adTags } });
        // console.log("Result:", result); // Log the result to see what's returned
        res.status(200).send({ 'Ads': result });
    } catch (err) {
        // console.error(err); // Log the error for debugging
        res.status(500).send({ 'error': err.message });
    }
};

// Delete ad from DB
exports.deleteAd = async(req, res) => {
    try{
        const result = await model.Ad.deleteOne({_id: req.params.id});
        res.status(200).send({'deletedCount': result.deletedCount})
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
};
