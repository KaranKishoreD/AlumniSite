const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const alert = require('alert');
const { promisify }  = require('util');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.isLoggedIn = async (req, res, next) => {
    // console.log(req.cookies);
    if( req.cookies.jwt ){
        try{
            // 1) Verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET
                );
        console.log(decoded);

        // Check if the user still exists
        db.query('SELECT * FROM USERS WHERE email = ?', [decoded.email], (error, result) => {
            console.log(result);

            if(!result) {
                return next();
            }
            req.user = result[0];
            return next();
        });

        } catch(error) {
            console.log(error)
            return next();
        }
    }
    else{
        next();
    }
    // req.message  = "Inside middleware"
     // to render a private page
}

exports.login =  async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(password);
        // console.log(email + password);
        if( !email || !password) {
            return res.status(400).render('index', {
                message: 'Please provide an email and password'
            })
        }
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if(results.length === 0){
                console.log("yeah");
                return res.redirect('/');
            }
            if( typeof results == "undefined" || !results || !(await bcrypt.compare(password, results[0].password) ) ) {
                res.status(401).render('index', {
                    message: 'email or password is incorrect'
                })
            } else {
                // console.log("chceked")
                const email = results[0].email;
                // console.log("email "+email);
                const token = jwt.sign({ email: email}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                // console.log("The token is " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/index-login");
            }
        })

    } catch (error) {
        console.log(error);
    }
}

exports.register = (req,res) => {
    console.log(req.body);

    // const username = req.body.username;
    // const email = req.body.email;
    // const password = req.body.password;

    const {username, email, password} = req.body;

    // Ensure only one account for each email
    db.query('SELECT email from users WHERE email = ?', [email], async (error, results) => {
        if(error) {
            console.log(error);
        } 
        if (results.length > 0) {
            //There is already an account with same email
            console.log(results.length);
            alert("Email already registered! Login at home page");
            return res.render('index', {
                message: 'Email already registered!'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        db.query('INSERT INTO users SET ?', {username: username, email: email, password: hashedPassword}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                alert("User registered successfully!");
                return res.render('index', {
                    message: 'User registered'
                });
            }
        });
    });
}

exports.logout = async (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2*1000),
        httpOnly: true
    });
    res.status(200).redirect('/');
}