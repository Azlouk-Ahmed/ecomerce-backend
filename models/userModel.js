const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
        type: Number,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    gender: {
      type: String,
      required: true,
    }
  }, { timestamps: true });


userSchema.statics.signUp = async function(email, password, fullname, gender) {

    if (!email || !password || !fullname || !gender) {
      throw Error("Email, password, fullname, and gender cannot be empty");
    } else if (!validator.isEmail(email)) {
      throw Error("Invalid email format");
    }
  
    const exist = await this.findOne({ email });
    if (exist) {
      throw Error("This email is already signed up. Please try to login.");
    }
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
  
    const user = await this.create({
      fullname,
      email,
      password: hash,
      gender,
    });
  
    return user;
};


userSchema.statics.logIn = async function(email, password) {
    const user = await this.findOne({ email });
    if(!email || !password) {
        throw Error("Email or password cannot be empty !");
    }
    if(!user) {
        throw Error("Email not found ! ");
    }

    const match = await bcrypt.compare(password, user.password);
    
    if(!match){
        throw Error("Incorrect password");
    }

    return user;
}

module.exports = mongoose.model("User", userSchema);
