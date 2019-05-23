const PostsModel = require('../models/postsModel');
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

exports.removePost = (postId)=>{

    var data = PostsModel.findById(postId)
    .select('_id authorid author status title content categories tags likes subscribers shares views imageurl datecreated datemodified')
    .exec()
    .then(product=>{  
                
                const data = {count: 0, products: {}};
                data.count = 1;
                data.products = {
                                    id: product._id, 
                                    name: product.name, 
                                    price: product.price, 
                                    imageurl: 'http://localhost/uploads' + product.imageurl
                };

                return data;
    
    })
    .catch(err=>{
        console.log(err);
        return err;
     });


    return data;

}



exports.getPost = async (postId)=>{

    var serviceDataPost = await PostsModel
    .findById(postId)
    .select('_id authorid author status title content categories tags likes subscribers shares views imageurl datecreated datemodified')
    .exec()
    .then(product=>{  
                console.log(product); 
                
                let data = {count: 0, products: {}};
                data.count = 1;
                data.products = {
                                    id: product._id, 
                                    name: product.name, 
                                    price: product.price, 
                                    imageurl: 'http://localhost/uploads' + product.imageurl
                                };
                                return data;
    })
    .catch(err=>{
        console.log(err);
        return err;
     });


    return serviceDataPost;
}

exports.listPosts = () => {
    
    const posts = PostsModel
    .find()
    .select('_id authorid author status title content categories tags likes subscribers shares views imageurl datecreated datemodified')
    .exec()
    .then(rows=>{
                if(rows.length >= 0)
                {
                    var products = rows.map(row=>{
                        return {id: row._id, 
                                authorid: row.authorid,
                                author: row.authorname,
                                status: row.status, 
                                title: row.title, 
                                content: row.content,
                                created: row.datecreated,
                                modified: row.dataemodified,
                                categories: row.categories,
                                tags: row.tags,
                                likes: row.likes,
                                subscribers: row.subscribers,
                                shares: row.shares,
                                views: row.views,
                                imageurl: '/uploads' + row.imageurl, 
                            }
                    });


                    return products;
                }
    })
    .catch(err=>{console.log(err); return err;});

    return products2;

}













