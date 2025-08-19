const isVerified = (req,res, next)=>{
const user = req.user
if(!user.isVerified){
  return res.status(401).json({
    Message : "You're not verfied yetttttttt"
  })
}

next()
}

module.exports = isVerified   