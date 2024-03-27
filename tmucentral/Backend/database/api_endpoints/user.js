const model = require('./model');

// Retreive all users in the DB
exports.getUser = async(req, res) => {
    try {
        const result = await Users.find(); // return all users from the Users schema
        if(result.length === 0) {
            res.status(404).send({'error': 'No entries'});
        }
        else{
            res.status(200).send({"Users": result});
        }
        
    }
    catch(err) {
        res.status(500).send(err.message);
    }
};

// Add user to DB
exports.postUser = async(req, res) => {
    try{
        // console.log(req.body);
        const user = new Users(req.body);          // Create new user
        await user.save();                         // Save user into DB. await added to wait for user to be saved before sending the response
        res.status(201).send({"Users": user});
    }
    catch(err){
        res.status(400).send(err.message);   // status 400 = user submitted bad request
    }
};


// Setting up parameterized URL and Query Stiring param
// Return a single user based on their id
exports.getUserID = async(req, res) => {  
    // console.log({
    //     "requestParams": req.params,
    //     "requestQuery": req.query, 
    // });
    try{
        const {id: userID} = req.params; //destructuring
        // console.log('here');
        // console.log(userID);
        const result = await Users.findById(userID);
        // console.log(result);
        // Check to see if user with specified id exists in DB
        if(!result) {
            res.status(404).send({'error': `No user found with id ${userID}`});
        }
        else{
            res.status(200).send(result);
        }
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
};


// Update a user based on their ide, completely, in DB
exports.putUser = async(req, res) => {  
    try{
        const {id: userID} = req.params;
        // Find the object in DB and replace it. the new args is a flag returning the changed data
        const result = await Users.findOneAndReplace({_id: userID}, req.body, {new: true});  
        console.log(result);
        res.status(200).send({result});
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
};


// Update specific properties of user instead of replacing entire entry
exports.patchUser = async(req, res) => {
    try{
        const {id: userID} = req.params;
        const result = await Users.findOneAndUpdate({_id: userID}, req.body, {new: true});  // Find the object in DB and replace it. the new args is a flag returning the changed data
        console.log(result);
        res.status(200).send({result});
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
};

// Delete user from DB
exports.deleteUser = async(req, res) => {
    try{
        const {id: userID} = req.params;
        const result = await Users.deleteOne({_id: userID});
        res.status(200).send({'deletedCount': result.deletedCount})
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
};


// ---------  THIS IS FOR WHEN WE DEAL WITH NESTED OBJECTS ----------------
/*
// Update specific proeprties of nested objects
router.patch('/users/test/:id', async (req, res) => {
    console.log(req.params);
    const testID = req.params.id;
    req.body._id = testID;      // prevent mongodb from overwriting current id
    try{
        const result = await Users.findOneAndUpdate(
            {'test._id': testID},           // Find user with testid
            {$set: {'test.$': req.body}},   // Update the parameter associated with test object
            {new: true}
        );
        console.log(result);

        if(result) {
            res.send(result);
        }
        else{
            res.status(404).send({'error': 'Update failed'});
        }
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
});

router.get('/users/test/:id', async (req, res) => {
    try{
        const result = await Users.findOne({'test._id': req.params.id});  // returns the enture document with all the info
        if(result) {
            res.send(result.test);                                        // return specific part of the document, in this case its the test attribute                             
        }
        else{
            res.status(404).send({'error': 'Not found'});
        }
    }
    
    catch(err){
        res.status(500).send({'error': err.message});
    }
});
*/
// ---------  THIS IS FOR WHEN WE DEAL WITH NESTED OBJECTS ----------------


// router.get('/users/studentID/:studentID', async (req, res) => {
//     console.log({
//         "requestParams": req.params,
//         "requestQuery": req.query, 
//     });
//     const {studentID: studentNo} = req.params; //destructuring
//     // console.log(studentNo);
//     const result = await Users.find({"studentID":studentNo});   // retreive specific user based on studentID
//     // Check to see if returned result has length of 0
//     if(result.length === 0) {
//         res.status(404).send({'error': `No user found with student ID ${studentNo}`});
//     }
//     else{
//         // console.log(result);
//         res.status(200).send(result);
//     }
// });

