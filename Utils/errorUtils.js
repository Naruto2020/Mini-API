// gestion des erreurs 

module.exports.signUpErrors = (err) =>{
    let errors = { lastName:"" , firstName : "", adress :"", email: "", password : "", niveau: ""};
    if(err.message.includes("lastName"))
      errors.lastName = "lastName incorrect";
    if(err.message.includes("firstName"))
      errors.firstName = "firstName incorrect";
    if(err.message.includes("adress"))
      errors.adress = "adress incorrect ou déjà pris";
    if(err.message.includes("email"))
      errors.email = "Email incorrect";
    if(err.message.includes("password"))
      errors.password = "le mot de passe doit faire 6 caractères minimum";
    if(err.message.includes("niveau"))
      errors.niveau = "le niveau est requis";
      

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "cet email est déjà enregistrer";  

    return errors;
};

module.exports.signInErrors = (err) =>{
    let errors = {email : "", password : ""};
    if(err.message.includes("email"))
      errors.email = "Email inconnu";
    if(err.message.includes("password"))
      errors.password = "le mot de passe ne correspond pas"  

    return errors;  
};

module.exports.uploadErrors = (err) =>{
  let errors = {format : "", maxSize : ""};

  if(err.message.includes("invalid file"))
    errors.format = "format fichier incompatible";

  if(err.message.includes("max size"))
    errors.maxSize = "fichier trop volumineux > 500ko"  ;

  return errors;
};

