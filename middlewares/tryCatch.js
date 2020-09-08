

const tryCatchs = (controller) => async (req,res) => {
    try{
        await controller(req,res)
    } catch (err){
        console.log(`${err}`)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
module.exports = tryCatchs