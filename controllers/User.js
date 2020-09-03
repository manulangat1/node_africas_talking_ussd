const mongoose = require('mongoose')
const User = require('../models/User')
const { sendSms} =  require('../utils/send_sms')
const UssdMenu = require('ussd-menu-builder')


exports.postUser = async(req,res) => {
    const { username,tel,password} = req.body 
    const newUser =new  User(req.body)
    await newUser.save()
    message = `Hi, ${username} you have been registered successfully.`
    await sendSms(message,tel)
    res.status(201).json({
        success:true,
        data:newUser
    })
}
exports.getUser = async (req,res) => {
    const users = await User.find()
    res.status(200).json({
        success:true,
        data:users
    })
}
exports.usD =  async (req,res) => {

    const { sessionId,serviceCode,phoneNumber,text } = req.body
    const textValue = text.split('*').length
    // const message = ""
    // welcomeMsg = 'Hi, what do you want to do leo?'
    const orderDetails = {
        name:"",
        amount:"",
        tel:""
    }
    const menu = new UssdMenu()
    const user = await User.findOne({tel:phoneNumber})
    menu.startState({
        run: () => {
            // use menu.con() to send response without terminating session      
            menu.con('Welcome. Choose option:' +
                '\n1. Show Balance' +
                '\n2. Buy Airtime');
        },
        // next object links to next state based on user input
        next: {
            '1': 'showBalance',
            '2': 'buyAirtime'
        }
    });
    menu.run(req.body, ussdResult => {
        res.status(200).send(ussdResult);
    });
    // if (user){
    //     message = 'Kindly input your username and password to get going'
    // }
    // if(text === ''){
        
    //     if (user){
    //         message = `CON Hi ${user.username},
    //         Choose Option' +
    //                      '\n1. Load Account' 
    //                      '\n2. View Catalogue' 
    //                      '\n3. Check Balance'`
    //     }
    //     else {
    //         message = 'CON Hi,Kindly register before going on...'
    //     }
        
    // } else if(textValue === 1){
    //     message = "CON What do you want to eat?"
    //     orderDetails.name = text.split('*')[1]
    // } else if (textValue == 2){
    //     message = "CON What amount do you want?"
    //     orderDetails.amount = text.split('*')[3]
    // } else {
    //     const { name,amount} = orderDetails
    //     console.log(orderDetails)
    //     message = `END Thanks for your order, Enjoy your meals. You have ordered ${name} of ${amount} quantity`
    // }
    // res.contentType('text/plain')
    // res.status(200).send(message)
    
    // console.log(req.body)
}