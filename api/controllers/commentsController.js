const PostsService = require('../services/postsServices');
const BenchmarkUtils = require('../utils/benchmarkUtils');
const UtilsMailer = require('../utils/mailer');

const PostsCreateResponse = require('../response/posts/postsCreateResponse');
const PostsListResponse = require('../response/posts/postsListResponse');
const PostsGetResponse = require('../response/posts/postsGetResponse');



exports.createComment = async (req, res, next)=>{
    try
    {
        const benchmark = new BenchmarkUtils();
        const status = req.body.status; 
        const postid = req.body.postid; 
        const userid = req.body.userid; 
        const comment = req.body.comment; 
        const datecreated = Date.now();
        const datemodified = Date.now();
        const commentsServiceData = await PostsService.createComment(status, 
                                                                postid, 
                                                                userid, 
                                                                comment, 
                                                                datecreated, 
                                                                datemodified);
        const jsonResponse = PostsCreateResponse.SuccessResponse(commentsServiceData);

        jsonResponse.benchmark = benchmark.getDuration();
        res.status(200).json(jsonResponse);
    }
    catch(error)
    {
        const jsonResponse = PostsCreateResponse.FailedResponse(error);
        res.status(400).json(jsonResponse)
    }
}
