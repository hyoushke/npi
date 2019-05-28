const BenchmarkUtils = require('../utils/benchmarkUtils');
const UsersService = require('../services/usersServices');
const UsersResponse = require('../response/genericResponse');


exports.creteUser = async (req, res, next)=>{
    try
    {
        const benchmark = new BenchmarkUtils();
        const status = "Active"; 
        const username = req.body.username; 
        const email = req.body.email; 
        const password = req.body.password; 
        const firstname = req.body.firstname; 
        const lastname = req.body.lastname; 
        const gender = ''; 
        const avatar = ''; 
        const datecreated = Date.now();
        const datemodified = Date.now();

        const usersServiceData = await UsersService.createUser(status, username, email, password, firstname, lastname, gender, avatar, datecreated, datemodified);

        if(usersServiceData.error) 
        {
            throw (usersServiceData.error);
        }

        const r = UsersResponse.genericResponse('users', 'create', 'success', usersServiceData, benchmark.getDuration());

        res.status(r.code).json(r);
    }
    catch(error)
    {
        const r = UsersResponse.genericResponse('users', 'create', 'failed', error, '0 ms');
        res.status(r.code).json(r);
    }
}

exports.loginUser = async (req, res, next)=> {

    try
    {
        const usersServiceData = await UsersService.loginUser(email, password);
        
        if(usersServiceData.error) 
        {
            throw (usersServiceData.error);
        }

        const r = CommentsResponse.genericResponse('users', 'create', 'success', usersServiceData, benchmark.getDuration());

        res.status(r.code).json(r);

    }
    catch(error)
    {
        const r = usersServiceData.genericResponse('users', 'login', 'failed', error, '0 ms');
        res.status(r.code).json(r);
    }
    


}
