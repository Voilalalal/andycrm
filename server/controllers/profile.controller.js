const { Profile } = require("../models/profile.model");
const bcrypt = require('bcrypt')


module.exports.createProfile = async (req, res) => {
  const { email, password,pass_confirm} = req.body;

if(password != pass_confirm  ) {
  return res.status(401).json({error : 'Las contraseñas no coinciden'})
}
if (password.length <= 4) {
  return res.status(401).json({error : 'Las contraseñas no es segura'})
}

try{

  const existingProfile = await Profile.findOne({email: email})

  if(existingProfile){
    return res.status(401).json({ error: 'Este usuario ya existe' });
  }

  const pass_bcrypt = await bcrypt.hash(password,10) 
  Profile.create({
    email : email,
    password : pass_bcrypt,
  })

  return res.status(200).json({status : 'todo ok'})
}catch(error){
  return res.status(400).json(error)

}


};






