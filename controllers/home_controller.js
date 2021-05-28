module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie("user",243)
    return res.render('home',{
        title:"HOME"
    });
}
//module.exports.ActionName = function(req,res){};