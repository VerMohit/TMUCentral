const model = require('./model');

// Retreive all advertisements
exports.getAds = async(req, res) => {
    try{
        const result = await model.Ad.find();
        if(result === 0){
            res.status(404).send({'error': 'No results returned'})
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
        const adID = req.params.id;
        const result = await model.Ad.findOneAndUpdate({_id: adID}, req.body, {new: true});
        console.log(result);
        res.status(201).send({'Ads': result});
    }
    catch(err) {
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
