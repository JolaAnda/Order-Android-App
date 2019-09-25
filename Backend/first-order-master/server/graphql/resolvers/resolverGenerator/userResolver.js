import User from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function verifyUserToken(args) {
  console.log("Verify Token called");
  try {
    const decoded = jwt.verify(args.token, "mysecret");
    const user = await User.filter({ id: decoded.id }).then(result => {
      return result[0];
    });
    return { ...user, password: null };
  } catch (err) {
    throw err;
  }
}

export async function userLogin(args) {
  try {
    const user = await User.filter({ email: args.email }).then(result => {
      if (!result[0]) {
        throw new Error("Email does not exist");
      }

      return result[0];
    }); //looks for user in the database with the given email

    const passwordIsValid = await bcrypt.compareSync(
      args.password,
      user.password
    ); //Checks if users password hash equals the saved password hash
    if (!passwordIsValid) throw new Error("Password incorrect"); //Throws error if password hashes are not equal
    const token = jwt.sign({ id: user.id }, "mysecret");
    return { token, password: null, ...user };
  } catch (err) {
    throw err;
  }
}

export async function addUser(args) {
  try {
    const { fname, lname, email, password, confirmPW } = args.userInput; //retrieve values from arguments

    await User.filter({ email: email }).then(result => {
      if (result[0]) {
        throw new Error("User already exists!"); //throws error, if user is already there
      }
      return result[0];
    }); //Looks for existing user in DB

    if (password !== confirmPW) {
      throw new Error("Passwords are inconsistent!"); //throws error if pw is not equals confirmation of pw
    }

    const hashedPassword = await bcrypt.hash(password, 10); //hashes the users pw
    const user = new User(
      {
        fname,
        lname,
        email,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      } //Makes new instance of User with new hashed PW and email
    );

    let result = await user.save().then(result => {
      return result;
    }); //Saves user in db
    // if user is registered without errors
    // create a token
    const token = jwt.sign({ id: result.id }, "mysecret"); //generates user token with users id assigned to it as well as a secred word which needs to be remembered

    return { token, password: null, ...user }; //returns token
  } catch (err) {
    throw err;
  }
}
