const BenchmarkUtils = require('../utils/benchmarkUtils');
const UsersService = require('../services/usersServices');


exports.creteUser = async (req, res, next)=>{
    try
    {

        const benchmark = new BenchmarkUtils();
        const status = "Active"; 
        const username = req.body.username; 
        const firstname = req.body.firstname; 
        const lastname = req.body.lastname; 
        const email = req.body.email; 
        const password = req.body.password; 
        const gender = ''; 
        const avatar = ''; 
        const datecreated = Date.now();
        const datemodified = Date.now();
        const usersServiceData = await UsersService.createUser(status, 
                                                                postid, 
                                                                userid, 
                                                                comment, 
                                                                datecreated, 
                                                                datemodified);
        if(commentsServiceData.error) 
        {
            throw (commentsServiceData.error);
        }

        const r = CommentsResponse.genericResponse('users', 'create', 'success', usersServiceData, benchmark.getDuration());

        res.status(r.code).json(r);
    }
    catch(error)
    {
        const r = CommentsResponse.genericResponse('users', 'create', 'failed', error, '0 ms');
        res.status(r.code).json(r);
    }
}

exports.loginUser = async (req, res, next)=> {

}
