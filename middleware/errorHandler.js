export default function errorHandler(err, req, res, next) {
    console.log(`🤖 Something Went Wrong!
    Error: ${err.name}
    `)
    console.log(err.stack)
  
    if (err.name === 'NotFound' || err.name === 'CastError') {
      return res.status(404).json({ message: 'Not Found' })
    }
  
    if (err.name === 'ValidationError') {
      const customErrors = {}
  
      for (const key in err.errors) {
        customErrors[key] = err.errors[key].message
      }
  
      return res.status(422).json(customErrors)
    }
  
    if (err.name === 'AlreadyExists') {
      return res.status(400).json({ message: 'This cheese already exists in CheeseBored, please try another 🧀!' })
    }
  
    //* User errors
    if (err.name === 'UsernameExists') {
      return res.status(400).json({ message: 'This username is taken, please try another.' })
    }
    if (err.name === 'EmailExists') {
      return res.status(400).json({ message: 'This email is taken, please try another.' })
    }
    if (err.name === 'PasswordsNotMatching') {
      return res.status(400).json({ message: 'Make sure your passwords are matching.' })
    }
    if (err.name === 'UserInfoMissing') {
      return res.status(422).json({ message: 'Looks like you missed a field.' })
    }
    if (err.name === 'Unauthorized') {
      return res.status(401).json({ message: 'You are not autharized.'})
    }
    res.sendStatus(500)
    next(err)
  }