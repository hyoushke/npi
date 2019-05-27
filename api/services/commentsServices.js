const CommentsModel = require('../models/commentsModel');
const mongoose = require('mongoose');

exports.createPost = async (status, 
                            postid, 
                            userid, 
                            comment, 
                            datecreated, 
                            datemodified)=>{

    const Comment = new CommentsModel({
        _id: new mongoose.Types.ObjectId(),
        status: status,
        postid: postid,
        userid: userid,
        comment: comment,
        datecreated: datecreated,
        datemodified: datemodified,
    });

    const commentsServiceData = await Comment
    .save()
    .then(result=>
    {
        const resultData = result;
        return resultData;
    })
    .catch(resultError=>
    {
        return resultError;
    });


    return commentsServiceData;
}


exports.listComments = (field, value, limit, page) => {
    
    const skip = (limit * page) - limit;
    const startat = skip + 1;
    console.log('limit ' + limit);
    console.log('page ' + page);
    console.log('skipped ' + skip + ' rows, and start at row ' + startat );


    const query =
    {
        status: /Active/
        //'name.last': 'Ghost',
        //authorid: { $gt: 1, $lt: 66 },
        //likes: { $in: ['vaporizing', 'talking'] }
    }

    const options = {
        select:   '_id authorid author status title content categories tags likes subscribers shares views imageurl datecreated datemodified',
        sort:     {author: 1},
        //populate: '_id authorid author status title content categories tags likes subscribers shares views imageurl datecreated datemodified',
        //populate: '_id authorid author status title content categories tags likes subscribers shares views imageurl datecreated datemodified',
        lean:     true,
        offset:   skip, 
        limit:    limit
    };

    const postsServiceData = PostsModel
    .paginate(query, options)
    //.find()
    //.sort({author: 1})
    //.skip(skip)
    //.limit(limit)
    //.select('_id authorid author status title content categories tags likes subscribers shares views imageurl datecreated datemodified')
    //.exec()
    .then(result=>{
            console.log('______________________________________________________________');
               console.log(result);
               console.log('______________________________________________________________');

                //if(rows.length >= 0)
                //{
                    const posts = result.docs.map(doc=>
                    {
                        return {id: doc._id, 
                                authorid: doc.authorid,
                                author: doc.author,
                                status: doc.status,
                                title: doc.title, 
                                content: doc.content,
                                created: doc.datecreated,
                                modified: doc.datemodified,
                                categories: doc.categories,
                                tags: doc.tags,
                                likes: doc.likes,
                                subscribers: doc.subscribers,
                                shares: doc.shares,
                                views: doc.views,
                                imageurl: process.env.HOST + process.env.UPLOAD_ROUTE + doc.imageurl, 
                            }
                    });
                    result.docs = posts;
                    result.totalpages = Math.ceil(parseInt(result.totalDocs)/ limit);
                    return result;
                //}
    })
    .catch(resultError=>
    {
        return resultError;
    });

    return postsServiceData;

}