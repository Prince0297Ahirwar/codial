module.exports.home = function(req,res){
    console.log(req.cookies);
    return res.render('home',{
        title:"HOME"
    });
}
//module.exports.ActionName = function(req,res){};