// The main file in package.json after doing npm init was index.js so we created this

import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const saltRounds = 12;
const secretkey = "mynameiskhanandiamnotaterrorist";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

mongoose.set('strictQuery', false);
const DB = "mongodb+srv://rayaankhan:4nLQyNmYjdXfBWv6@cluster0.trbiaoh.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(DB).then(() => {
    console.log("connection succesful");
}).catch((err) => {
    console.log(err)
});

// userData is the name of my DB
// const data = ''

const userSchema = new mongoose.Schema({

    firstName: String,
    firstName: {type: String, required: true},
    lastName: String,
    lastName: {type: String, required: true},
    userName: String,
    userName: { type: String, required: true, unique: true },
    email: String,
    email: { type: String, required: true, unique: true },
    age: String,
    contact: String,
    password:String,
    password: { type: String, required: true },
    reEnterPassword:String,
    reEnterPassword: { type: String, required: true}
})

const profileSchema = new mongoose.Schema({
    userName: String,
    followers: [String],
    following: [String],
    followersNumber: Number,
    followingNumber: Number,
    about: String
})

const subGreddiitSchema = new mongoose.Schema({
    userName : String,
    name : String,
    followers : [String],
    post : [String],
    postuser : [String],
    description : String,
    date : Date,
    tags : [String],
    bannedKeywords : [String]
})

const User = new mongoose.model("User", userSchema);
const Profile = new mongoose.model("Profile", profileSchema);
const SubGreddiit = new mongoose.model("SubGreddiit", subGreddiitSchema)
//Routes

app.get("/", (req, res)=>{
    res.send("My API.");
})

app.post("/register", (req, res)=>{
    // const navigate = useNavigate();
    // console.log("Hi man how r u");
    // console.log(req.body);
    // this is to get the data from the request
    const {firstName,lastName,userName,email,age,contact,password,reEnterPassword} = req.body;
    // finding the user by checking the mail
    User.findOne({email: email}, (err, user) => {
        // if found
        if(user) {
            console.log("User already there");
            res.send({message: 1});
            // navigate("/");
        }
        else {
            // now to encrypt the password
            bcrypt.hash(password, saltRounds, function (err, hash){
                const user = new User({
                    firstName: firstName,
                    lastName: lastName,
                    userName: userName,
                    email: email,
                    age: age,
                    contact: contact,
                    password: hash,
                    reEnterPassword: reEnterPassword 
                })
                const profile = new Profile({
                    userName: userName,
                    followers: [],
                    following: [],
                    followersNumber: 0,
                    followingNumber: 0,
                    about: 'Your about will reflect here!'
                })
                console.log("Your newUser details: " + user);
                // console.log("hashed password is: " + hash);

                user.save(err => {
                    if(err)
                    {
                        console.log(err);
                        console.log("there is an error");
                        res.send({ message: 0 });
                    }
                    else
                    {
                        console.log("User has been saved");
                        // res.send({message: 2});
                    }
                })
                profile.save(err => {
                    if(err)
                    {
                        console.log(err);
                        console.log("there is an error");
                        res.send({ message: 0 });
                    }
                    else
                    {
                        // console.log(profile)
                        console.log("Profile has been made");
                        res.send({message: 2});
                    }
                })
            })
        }
    });
})

app.post("/login", (req, res)=>{
    const{userName, password} = req.body;
    // console.log(req.body)
    User.findOne({userName: userName}, (err, user) => {
        if(user){
            console.log("mil gaya");
            bcrypt.compare(password, user.password, function (err, result) {
                if (result == true) {
                    const token = jwt.sign(user.toJSON(), secretkey);
                    // console.log(token)
                    const tosend = { message: 1, tok: token };
                    // console.log("token is: " + token);
                    // console.log("tosend is: " + tosend);
                    res.send(tosend);
                }
                else {
                    res.send({ message: 0 });
                }
            });
            // res.send({message: 1});
        }
        else
        {
            console.log("gaayab");
            res.send({message: 0});
        }
    });
});

const authorization = function (req, res, next) {
    const token = req.body.token;
    if (token) {
        try {
            const decode = jwt.verify(token, secretkey);

            req.body.decode = decode;
            next();
        } catch (err) {
            console.log(err);
        }
    } else {
        res.send("Token not found");
        console.log("Authorization Error");
    }
};

app.post("/update",authorization, (req, res)=>{
    const data = req.body.finalUser
    const ab = req.body.ab
    // console.log(data)
    // res.send({ message: 1 })
    // console.log(data.userName)
    User.findOneAndUpdate({ email: data.email }, data, (err, us) => {
        if (err) {
            console.log("THIS IS AN UPDATE ERROR IN SERVER");
            console.log(err);
            return res.send({ message: 0 });
        }
        else {
            Profile.findOneAndUpdate({userName: us.userName}, {about: ab}, (err, pr) => {
                if(pr){
                    // console.log("about updated")
                    return res.send({message: 1})
                }
                else{
                    console.log("About couldn't be updated")
                    console.log(err)
                    return res.send({ message: 0 });
                }
            })
            // console.log("rr")
            // token = jwt.sign(us.toJSON(), secretkey);
            // window.localStorage.setItem("userToken",token);
            // console.log(us)
            // return res.send({ message: 1 });
        }
    });
})

app.post("/getprevvalues",authorization, (req, res) => {
    const prev = req.body.decode
    User.findOne({ userName: prev.userName }, (err, us) => {
        if(us){
            // console.log(us.userName)
            Profile.findOne({userName: us.userName}, (err, pr) => {
                if(pr){
                    // console.log("found profile")
                    // console.log(pr)
                    res.send({values: us, profileData: pr})
                }
                else{
                    console.log(err)
                }
            })
        }
        else{
            console.log(err)
        }
    })
    // res.send({"values": prev})

})

app.post("/toSearch", authorization, (req, res) => {
    const prev = req.body.decode
    // console.log(req.body.searchIt)
    const searchUserName = req.body.searchIt
    User.findOne({ userName: searchUserName }, (err, us) => {
        if(us){
            // console.log("prpr")
            Profile.findOne({userName: us.userName}, (err, pr) => {
                if(pr){
                    // console.log("found profile")
                    // console.log(pr, us)
                    res.send({values: us, profileData: pr, message: 1})
                }
                else{
                    console.log(err)
                    res.send({message: 0})
                }
            })
        }
        
        else{
            // console.log("hereitis")
            SubGreddiit.findOne({name: searchUserName}, (err, gr) => {
                if(gr){
                    // console.log(gr)
                    res.send({message: 2, greddiit: gr})
                }
                else{
                    console.log(err)
                    res.send({message: 0})
                }
            })
        }
    })
})

app.post("/getprevvaluesother",authorization, (req, res) => {
    const prev = req.body.decode
    const other = req.body.userName
    // console.log("the other user is: "+other)
    User.findOne({ userName: other }, (err, us) => {
        if(us){
            // console.log(us.userName)
            Profile.findOne({userName: other}, (err, pr) => {
                if(pr){
                    // console.log("found profile of other")
                    // console.log(pr)
                    res.send({values: us, profileData: pr})
                }
                else{
                    console.log(err)
                }
            })
        }
        else{
            console.log(err)
        }
    })
    // res.send({"values": prev})

})

app.post("/updatefollowers", authorization, (req, res) => {
    const prev = req.body.decode
    const other = req.body.userName
    const no = req.body.followers
    Profile.findOne({userName: prev.userName}, (err, us) => {
        const no2 = us.followingNumber
        // console.log("no2 = "+no2)
        const list = req.body.followers
        // console.log("number of followers: "+no)
        // console.log("prev is "+us.about)
        // console.log("other is: "+other)
        Profile.findOneAndUpdate({userName: other}, {followersNumber: no}, (err, pr) => {
            if(pr){
                console.log(us.userName)
                console.log(pr.userName)
                pr.followers.push(us.userName);
                pr.save();
                Profile.findOneAndUpdate({userName: us.userName}, {followingNumber: no2+1}, (err, pr1) => {
                    if(pr1){
                    pr1.following.push(pr.userName)
                    pr1.save()
                    }
                    else{
                        console.log(err)
                    }
                })
                // console.log("Followers Number updated")
                return res.send({message: 1})
            }
            else{
                console.log("No couldn't be updated")
                console.log(err)
                return res.send({ message: 0 });
            }
        })
    })
    
})

app.post("/updateunfollowers", authorization, (req, res) => {


    const prev = req.body.decode
    const other = req.body.userName
    const no = req.body.followers
    Profile.findOne({userName: prev.userName}, (err, us) => {
        const no2 = us.followingNumber
        console.log("no2 = "+no2)
        const list = req.body.followers
        console.log("number of followers: "+no)
        console.log("prev is "+us.about)
        console.log("other is: "+other)
        Profile.findOneAndUpdate({userName: other}, {followersNumber: no}, (err, pr) => {
            if(pr){
                console.log(us.userName)
                console.log(pr.userName)
                pr.followers.splice(pr.followers.indexOf(us.userName),1);
                pr.save();
                Profile.findOneAndUpdate({userName: us.userName}, {followingNumber: no2-1}, (err, pr1) => {
                    if(pr1){
                    pr1.following.splice(pr1.following.indexOf(pr.userName),1)
                    pr1.save()
                    }
                    else{
                        console.log(err)
                    }
                })
                console.log("Followers Number updated")
                return res.send({message: 1})
            }
            else{
                console.log("No couldn't be updated")
                console.log(err)
                return res.send({ message: 0 });
            }
        })
    })
})

app.post("/checkfollowers",authorization,(req, res) => {
    const prev = req.body.decode;
    const username = req.body.userName;
    Profile.findOne({ userName: prev.userName })
    .then((pr) => {
        if(pr.following.includes(username))
        {
            // console.log("hereiam")
            res.send({message : false});
        }
        else
        {
            res.send({message : true});
        }
    })
})

app.post("/toremovefollowers", authorization, (req, res) => {
    const prev = req.body.decode
    const other = req.body.toRemove
    // const noOfFollowers = 
    Profile.findOne({userName: prev.userName}, (err, us) => {
        var no2 = us.followersNumber-1
        console.log(no2)
        Profile.findOneAndUpdate({userName: prev.userName},{followersNumber: no2}, (err, us) => {
            if(us){
                console.log(prev.userName)
            }
        })
        us.followers.splice(us.followers.indexOf(other), 1)
        us.save()
        // console.log("no2 = "+no2)
        // const list = req.body.followers
        // console.log("number of followers: "+no)
        // console.log("prev is "+us.about)
        // console.log("other is: "+other)
        Profile.findOne({userName: other}, (err, pr) => {
            if(pr){
                // console.log(us.userName)
                // console.log(pr.userName)
                no2 = pr.followingNumber-1
                Profile.findOneAndUpdate({userName: other},{followingNumber: no2}, (err, us) => {
                    if(us){
                        console.log(other)
                    }
                })
                console.log(pr.followingNumber)
                pr.following.splice(pr.following.indexOf(us.userName),1)
                pr.save();
                // Profile.findOneAndUpdate({userName: us.userName}, {followingNumber: no2-1}, (err, pr1) => {
                //     if(pr1){
                //     pr1.following.splice(pr1.following.indexOf(pr.userName),1)
                //     pr1.save()
                //     }
                //     else{
                //         console.log(err)
                //     }
                // })
                console.log("Followers Number updated")
                return res.send({message: 1})
            }
            else{
                console.log("No couldn't be updated")
                console.log(err)
                return res.send({ message: 0 });
            }
        })
    })
})

app.post("/followerslist",authorization, (req, response) =>{
    const prev = req.body.decode;
    // console.log(prev.userName)
    Profile.findOne({ userName: prev.userName }).then((res) => {
        // console.log(res)
        response.send({message : res.followers});
    })
})

app.post("/followinglist",authorization, (req, response) =>{
    const prev = req.body.decode;
    // console.log(prev.userName)
    Profile.findOne({ userName: prev.userName }).then((res) => {
        // console.log(res)
        response.send({message : res.following});
    })
})

app.post("/addsubgreddiit", authorization, (req, res) =>{
    const prev = req.body.decode
    const sub = req.body.sub

    sub.followers.push(prev.userName)
    sub.userName=prev.userName

    const subgreddiit = new SubGreddiit({
        userName : sub.userName,
        name : sub.name,
        followers : sub.followers,
        post : sub.post,
        postuser : sub.postuser,
        description : sub.description,
        date : sub.date,
        tags : sub.tag,
        bannedKeywords : sub.bannedKeywords
    })
    subgreddiit.save(err => {
        if(err){
            console.log(err)
        }
        else{
            // console.log("subgreddiit made")
            res.send({message: 1})
        }
    })
    // console.log(req.body.sub)
})

app.post("/getsubgreddiitdata",authorization,(req,response)=>{
    // console.log("22")
    const prev = req.body.decode
    SubGreddiit.find({userName : prev.userName})
    .then((val)=>{
        // console.log("1")
        // console.log(val)
        response.send({message : val});
    }).catch((err)=>{
        // console.log("1")
        console.log(err);
        response.send({message : []});
    })
})

app.post("/deletesubgreddiit",authorization,(req,response)=>{
    // console.log("22")
    const prev = req.body.decode
    SubGreddiit.find({name : req.body.todelete})
    .then((val)=>{
        SubGreddiit.deleteOne({name : req.body.todelete}).then((a)=>{})
        // console.log(val)
        response.send({message : val});
    }).catch((err)=>{
        // console.log("1")
        console.log(err);
        response.send({message : []});
    })
})

app.post("/showusersofsubgreddiit", authorization, (req, res) => {
    const prev = req.body.decode
    // console.log("111")
    // console.log(req.body.greddiitname)
    SubGreddiit.findOne({name: req.body.greddiitname}, (err, gr) => {
        if(gr){
            // console.log(gr)
            res.send({message: gr.followers})
        }
    })
})

app.post("/addpost", authorization, (req, res) => {
    const prev = req.body.decode
    SubGreddiit.findOne({name: req.body.greddiitname}, (err, gr) =>{
        if(gr){
            gr.post.push(req.body.post)
            // console.log(gr.post)
            gr.save()
            res.send({message: 9})
        }
    })
})

app.post("/getallposts", authorization, (req, res) => {
    const prev = req.body.decode
    SubGreddiit.findOne({name: req.body.greddiitname}, (err, gr)=>{
        // console.log(gr)
        res.send({posts: gr.post})
    })
})


app.listen(9002, ()=>{console.log("Started at port 9002")})