var express = require("express");
var router = express.Router();
var userModel = require("../models/userModel");
var projectModel = require("../models/projectModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

const secret = "secret";

router.post("/signUp", async (req, res) => {
  try {
    let { username, name, email, password } = req.body;

    // Check if email already exists
    let emailExist = await userModel.findOne({ email: email });
    if (emailExist) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password and create user
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error hashing password",
          });
        }

        await userModel.create({
          username: username,
          name: name,
          email: email,
          password: hash,
        });

        // Send success response
        return res.json({
          success: true,
          message: "User created successfully",
        });
      });
    });
  } catch (err) {
    console.error("SignUp Error:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred during sign-up",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      let token = jwt.sign({ email: user.email, userId: user._id }, secret);
      return res.json({
        success: true,
        message: "User logged in successfully",
        token: token,
        userId: user._id,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
});

router.post("/getUserDetails",async(req,res) => {
  let {userId} = req.body;
  let user = await userModel.findOne({_id:userId});

  if(user){
    return res.json({
      success:true,
      message:"User details fetched successfully",
      user:user
    })
  }
  else{
    return res.json({
      success:false,
      message:"User not found"
    })
  }

});

router.post("/createProject",async(req,res) => {
  let {userId,title} = req.body;
  let user = await userModel.findOne({_id:userId});
  
  if(user){
    let project = await projectModel.create({
      title:title,
      createdBy:userId
    });
    return res.json({
      success:true,
      message:"Project created Successfully",
      projectId:project._id
    });
  }
  else{
    return res.json({
      success:false,
      message:"User not found!",
    });
  }
});

router.post("/getProjects",async(req,res) => {
let {userId} = req.body;
let user = await userModel.findOne({_id : userId});
if(user){
  let projects = await projectModel.find({createdBy : userId});

  return res.json({
    success:true,
    message:"Projects fetched successfully",
    projects : projects
  });
}
else{
  return res.json({
    success : false,
    message: "User not found!"
  });
}


})

router.post("/deleteProject",async(req,res) => {
  let {userId,projId} = req.body;
  let user = await userModel.findOne({_id : userId});
  console.log(user);
  if(user){
    let project = await projectModel.findOneAndDelete({_id:projId});

    return res.json({
      success : true,
      message : "Project deleted successfully",
    });
  }
  else{
    return res.json({
      success:false,
      message:"User not found!"
    });
  }
});

router.post("/getProject",async(req,res) => {
  let {userId,projectId} = req.body;
  console.log(projectId);
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOne({ _id: projectId });
    return res.json({ success: true, message: "Project fetched successfully", project: project });
  }
  else{
    return res.json({ success: false, message: "User not found!" });
  }
})

router.post("/updateProject", async (req, res) => {
  let { userId, htmlCode, cssCode, jsCode, projectId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (!user) {
    return res.json({
      success: false,
      message: "User not found!",
    });
  }
  let project = await projectModel.findOneAndUpdate(
    { _id: projectId },
    { htmlCode: htmlCode, cssCode: cssCode, jsCode: jsCode },
    { new: true } // This ensures you get the updated project back
  );
  if (!project) {
    return res.json({
      success: false,
      message: "Project not found or failed to update!",
    });
  }
  return res.json({
    success: true,
    message: "Project updated successfully",
  });
});


module.exports = router;
