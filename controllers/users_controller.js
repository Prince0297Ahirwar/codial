module.exports.profile = function(req,res){
    return res.end("<h1>Users Profile</h1>");
}


module.exports.post = function(req,res){
    return res.end("<h1> Post is called for profile </h1>");
}
