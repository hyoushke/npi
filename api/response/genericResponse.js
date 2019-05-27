
const getMessage = (controller, action, type)=>{
    const messages = {
        comments: {
            create : 
            {
             success: { status: 'OK', code: 201, message: 'Successfully created a new comment' }, 
             failed: { status: 'FAILED', code: 400, message: 'Failed creating a new comment' } 
            },
            list:
            {
                success: { status: 'OK', code: 200, message: 'Successfully fetched list of comments' }, 
                failed: { status: 'FAILED', code: 400, message: 'Failed fetching list of comments' } 
            },


           }
    }



    return messages[controller][action][type];
}

exports.genericResponse = (controller, action, type, data, benchmark)=>{
    const r = getMessage(controller, action, type);
    console.log('++++++++++++++++++++++++++++++++++++');
    console.log(r);
    console.log('++++++++++++++++++++++++++++++++++++');
    const response = {
        status : r.status,
        code : r.code,
        message : r.message,
        details : data,
        benchmark : benchmark
    }
    return response;
}

