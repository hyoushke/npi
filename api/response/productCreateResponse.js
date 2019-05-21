exports.SuccessResponse = (data)=>{
    const response = {
        status : 'OK',
        code : 200,
        message : 'Successfully Created New Product',
        details : data,
        benchmark : 0
    }

    console.log(response);

    return response;
}

exports.FailedResponse = (data)=>{
    const response = {
        status : 'OK',
        code : '200',
        message : 'Successfully Created New Product',
        details : data
    }
}