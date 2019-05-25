const PostsModel = require('../models/postsModel');
const mongoosepaginate = require('mongoose-paginate');
const mongoose = require('mongoose');

exports.createPost = async (authorid, 
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
                            datemodified)=>{
   
                                console.log('************************ service ****************************');

    const Post = new PostsModel({
        _id: new mongoose.Types.ObjectId(),
        authorid: authorid,
        author: author,
        status: status,
        title: title,
        content: content,
        categories: categories,
        tags: tags,
        likes: likes,
        subscribers: subscribers,
        shares: shares,
        views: views,
        imageurl: imageurl,
        datecreated: datecreated,
        datemodified: datemodified,
    });

    var postsServiceData = await Post
    .save()
    .then(result=>
    {
        const resultData = result;

        //TODO: formmatting
        //{
        // id: result._id, 
        // name: result.name, 
        // price: result.price, 
        // imageurl: 'http://localhost:3000/' + result.imageurl, 
        //}


        console.log(resultData);
        return resultData;
    })
    .catch(resultError=>
    {

        console.log(resultError);
        return resultError;
    });


    return postsServiceData;
}


exports.updatePost = async (postId,
                            authorid, 
                            author, 
                            status, 
                            title, 
                            content, 
                            categories, 
                            tags, 
                            imageurl)=>{

    const changeSet = 
    {
        authorid: authorid,
        author: author,
        status: status,
        title: title,
        content: content,
        categories: categories,
        tags: tags,
        imageurl: imageurl,
        datemodified: Date.now()
    };

    console.log(changeSet);

    const postsServiceData = await PostsModel
    .findOneAndUpdate(postId, {$set: changeSet}, {new: true})
    .then(doc=>{ return doc; })
    .catch(error=>{ return error; });

    console.log(postsServiceData);
    
    return postsServiceData;
}


exports.removePost = async (postId)=>{

    const postsServiceData = await PostsModel.findOneAndDelete({_id: postId }, (err, doc)=>{ 
        if(err)
        {
            return err;
        }
        return doc;
    });
    
    return postsServiceData;
}



exports.getPost = async (postId)=>{

    var serviceDataPost = await PostsModel
    .findById(postId)
    .select('_id authorid author status title content categories tags likes subscribers shares views imageurl datecreated datemodified')
    .exec()
    .then(docs=>
    {  
                    return docs;
    })
    .catch(err=>
    {
        console.log(err);
        return err;
     });

    return serviceDataPost;
}


exports.listPosts = (field, value, limit, page) => {
    
    const skip = (limit * page) - limit;
    const startat = skip + 1;
    console.log('limit ' + limit);
    console.log('page ' + page);
    console.log('skipped ' + skip + ' rows, and start at row ' + startat );

    const postsServiceData = PostsModel
    .find()
    .sort({author: 1})
    .skip(skip)
    .limit(limit)

    .select('_id authorid author status title content categories tags likes subscribers shares views imageurl datecreated datemodified')
    .exec()
    .then(result=>{
                //if(rows.length >= 0)
                //{
                //    var products = rows.map(row=>{
                //        return {id: row._id, 
                //                authorid: row.authorid,
                //                author: row.authorname,
                //                status: row.status, 
                //                title: row.title, 
                //                content: row.content,
                //                created: row.datecreated,
                //                modified: row.dataemodified,
                //                categories: row.categories,
                //                tags: row.tags,
                //                likes: row.likes,
                //                subscribers: row.subscribers,
                //                shares: row.shares,
                //                views: row.views,
                //                imageurl: '/uploads' + row.imageurl, 
                //            }
                //    });

                    const resultData = result;

                    return resultData;
                //}
    })
    .catch(resultError=>
    {
        return resultError;
    });

    return postsServiceData;

}













