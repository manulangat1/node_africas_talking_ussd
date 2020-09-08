
exports.sendSms = async (message,tel) =>{
    console.log("sending")
    console.log(message,tel)
    const credentials = {
        apiKey:process.env.apiKey,
        username:process.env.username
    }
    const AfricasTalking = require('africastalking')(credentials)
    const sms = AfricasTalking.SMS;
        const options = {
            to: tel,
            message:message,
            from:'3050'
        }
        // console.log(options)
        await sms.send(options)
            .then( response => {
                console.log(response);
            })
            .catch( error => {
                console.log(error);
            });
}