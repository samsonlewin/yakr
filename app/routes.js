// app/routes.js
module.exports = function(app, passport) {

var Chat = require('./models/chats.js');
var Messages = require('./models/messages.js');


    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

// process the login form
app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }),
function(){
    console.log(User.validate());
});


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


//main chat page routes

    app.get('/chat', function(req, res){
            res.render('chat.ejs', {
        });
    });



    app.post('/addchat', function(req,res){
    
    var allChat = {
        name: req.body.name,
        created: Date.now() 
    }
    var newChat = new Chat(allChat);


    newChat.save(function(err,doc){
        if(err){console.log(err)}
            else{
                console.log(doc);
            }
    })
 
    })
     app.get('/api/chat', function(req, res){
        Chat.find({}, function(err, doc){
            if(err){
                console.log(err)
            }
            else{
                console.log(doc)
                res.send(doc)
            }
        })
    })

app.get("/api/chat/:id", function(req, res) {

  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Chat.findOne({ "_id": req.params.id }, function(err,doc){
    console.log("your chat is"+req.params.id)
    if(err){console.log(err)}
        else{
            res.json(doc)
        }
  })
  // ..and populate all of the notes associated with it
  // now, execute our query
  //.exec(function(error, doc) {
    // Log any errors
  //  if (error) {
   //   console.log(error);
  //  }
    // Otherwise, send the doc to the browser as a json object
  //  else {
   //   res.json(doc);
   // }
  //});
});


    app.post('/addmessages', function(req,res){
       var allMessages = {
           created: Date.now(),
            content: req.body.content
        }
        console.log(allMessages);
    var newMessage = new Messages(allMessages);

    newMessage.save(function(err,doc){
        if(err){console.log(err)}
            else{
                console.log("this is docs: ", doc);
                Chat.findOneAndUpdate({_id:req.body._id}, {$push: {"messages": doc.content}}, function(err,newdoc){
                    if(err){console.log(err)}
                        else
                        {
                    res.send(newdoc);
                        }
                }) 


            }
    })
    })

    app.get('/api/messages', function(req,res){
        Messages.find({},function(err,doc){
            if(err){console.log(err)}
                else
                {
                    res.send(doc);
                }
        })
    })


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
