const CommentsService = require('../services/commentsServices');
const BenchmarkUtils = require('../utils/benchmarkUtils');

const CommentsCreateResponse = require('../response/posts/postsCreateResponse');
const CommentsListResponse = require('../response/posts/postsListResponse');
const CommentsGetResponse = require('../response/posts/postsGetResponse');



exports.createComment = async (req, res, next)=>{
    try
    {
        const benchmark = new BenchmarkUtils();
        const status = "Active"; 
        const postid = req.body.postid; 
        const userid = req.body.userid; 
        const comment = req.body.comment; 
        const datecreated = Date.now();
        const datemodified = Date.now();
        const commentsServiceData = await CommentsService.createComment(status, 
                                                                        postid, 
                                                                        userid, 
                                                                        comment, 
                                                                        datecreated, 
                                                                        datemodified);
        const jsonResponse = CommentsCreateResponse.SuccessResponse(commentsServiceData);

        jsonResponse.benchmark = benchmark.getDuration();
        res.status(200).json(jsonResponse);
    }
    catch(error)
    {
        const jsonResponse = CommentsCreateResponse.FailedResponse(error);
        res.status(400).json(jsonResponse)
    }
}
