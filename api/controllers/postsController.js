const PostsService = require('../services/postsService');
const UtilsBenchmark = require('../utils/benchmark');

const PostsCreateResponse = require('../response/posts/postsCreateResponse');
const PostsRemoveResponse = require('../response/posts/postsRemoveResponse');
const PostsUpdateResponse = require('../response/posts/postsUpdateResponse');
const PostsListResponse = require('../response/posts/postsListResponse');
const PostsGetResponse = require('../response/posts/postsGetResponse');


exports.createPost = async (req, res, next)=>{
    console.log('************************ controller ****************************');
    console.log(req.body);
    
    try
    {
        const procesStart = process.hrtime();
        
        const authorid = req.body.authorid; 
        const author = req.body.author; 
        const status = req.body.status; 
        const title = req.body.title; 
        const content = req.body.content; 
        const categories = req.body.categories; 
        const tags = req.body.tags; 
        const likes = 0; 
        const subscribers = 0; 
        const shares = 0; 
        const views = 0; 
        const imageurl = req.body.imageurl; 
        const datecreated = Date.now();
        const datemodified = Date.now();

        console.log(JSON.stringify(this));

        const postsServiceData = await PostsService.createPost(authorid, 
                                                                author, 
                                                                status, 
                                                                title, 
                                                                content, 
                                                                categories, 
                                                                tags, 
                                                                likes, 
                                                                subscribers, 
                                                                shares, 
                                                                views, 
                                                                imageurl, 
                                                                datecreated, 
                                                                datemodified);

        console.log(postsServiceData);

        const jsonResponse = PostsCreateResponse.SuccessResponse(postsServiceData);


        const benchmarkNanoSeconds = process.hrtime(procesStart);
        const benchmarkMiliSecondsPrecise = (benchmarkNanoSeconds[0]*1000) + (benchmarkNanoSeconds[1] / 1000000)
        jsonResponse.benchmark = (benchmarkMiliSecondsPrecise + ' ms');


        res.status(200).json(jsonResponse);
    }
    catch(error)
    {
        const jsonResponse = PostsCreateResponse.FailedResponse(error);
        res.status(400).json(jsonResponse)
    }
}




/*
exports.updateProduct = async (req, res, next)=>{
    try
    {
        const postId = req.params.postId;
        const postsServiceData = await PostsService.removeProductById(postId);

        
        const benchmarkNanoSeconds = process.hrtime(procesStart);
        const benchmarkMiliSecondsPrecise = (benchmarkNanoSeconds[0]*1000) + (benchmarkNanoSeconds[1] / 1000000)
        jsonResponse.benchmark = (benchmarkMiliSecondsPrecise + ' ms');

        const jsonResponse = PostsUpdateResponse.SuccessResponse(postsServiceData);
        res.status(200).json(jsonResponse);
    }
    catch(error)
    {
        const jsonResponse = PostsCreateResponse.FailedResponse(error);
        res.status(400).json(jsonResponse)
    }
}
*/

exports.removePost = async (req, res, next)=>{
    try
    {
        console.log('************************ controller ****************************');

        const procesStart = process.hrtime();
        
        const postId = req.params.postId;
        console.log(req.params);
        const postsServiceData = await PostsService.removePost(postId);

        console.log(postsServiceData);

        const jsonResponse = PostsRemoveResponse.SuccessResponse(postsServiceData);


        const benchmarkNanoSeconds = process.hrtime(procesStart);
        const benchmarkMiliSecondsPrecise = (benchmarkNanoSeconds[0]*1000) + (benchmarkNanoSeconds[1] / 1000000)
        jsonResponse.benchmark = (benchmarkMiliSecondsPrecise + ' ms');


        res.status(200).json(jsonResponse);
    }
    catch(error)
    {
        const jsonResponse = PostsCreateResponse.FailedResponse(error);
        res.status(400).json(jsonResponse)
    }

}

exports.listPosts = async (req, res, next)=>{
    try
    {
        const procesStart = process.hrtime();

        const postsServiceData = await PostsService.listPosts();

        const jsonResponse = PostsListResponse.SuccessResponse(postsServiceData);


        const benchmarkNanoSeconds = process.hrtime(procesStart);
        const benchmarkMiliSecondsPrecise = (benchmarkNanoSeconds[0]*1000) + (benchmarkNanoSeconds[1] / 1000000)
        jsonResponse.benchmark = (benchmarkMiliSecondsPrecise + ' ms');


        res.status(200).json(jsonResponse);
    }
    catch(error)
    {
        const jsonResponse = PostsListResponse.FailedResponse(error);
        res.status(400).json(jsonResponse)
    }
}

/*
exports.getProduct = async (req, res, next)=>{
    try
    {
        const postId = req.params.postId;
        const postsServiceData = await postsService.get.getProductById(postId);

        res.status(200).json(productServiceData);
    }
    catch(error)
    {
        res.status(400).json({
            "code": 0,
            "message": "Fetch Products Failed",
            "url": "http://localhost:3000/" + "products"
        })
    }
}
*/

