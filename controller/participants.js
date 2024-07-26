const supabase = require('../supabase.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email) throw new Error('Provide an email')
    else if (!password) throw new Error('Provide a password')

    const { data: user, error: err } = await supabase
      .from('participants')
      .select('*')
      .eq('email', email)
    if (err) throw err
    if (user.length !== 0) throw new Error('User already exists.')

    const hashedPassword = await bcrypt.hash(password, 10)

    const { error } = await supabase
      .from('participants')
      .insert({
        email: email,
        password: hashedPassword
      })
    if (error) throw error

    res.status(201).json({
      success: true,
      message: "Account created"
    })
  } catch (err) {
    return res.status(409).send({
      data: null,
      error: err.message,
    })
  }
}

module.exports.verifyUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email) throw new Error('Provide an email')
    else if (!password) throw new Error('Provide a password')

    const { data: user, error } = await supabase
      .from('participants')
      .select('*')
      .eq('email', email)
    if (error) throw error
    if (!user.length) throw new Error("Account doesn't exists")

    const isPasswordValid = await bcrypt.compare(password, user[0].password)
    if (!isPasswordValid) throw new Error("Incorrect password")

    const token = jwt.sign({ userId: user[0].p_id }, process.env.JWT_SECRET, { expiresIn: '12h' })

    return res.status(201).json({
      success: true,
      message: "Login success",
      token
    })
  } catch (err) {
    return res.status(409).send({
      data: null,
      error: err.message,
    })
  }
}