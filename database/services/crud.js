const mongose = require('mongoose');
const { remove } = require('../models/user');
const User = require('../models/user')


const addUser = async (data) =>{
    try{
        const user = new User(data);
        await user.save();
        console.log(user);
        return user;
    } catch (error) {
        console.log(error);
    }
}

const findUsers = async () => {
    try {
        const users = await User.find({});
        console.log(users);
        return users;
    } catch (error){
        console.log(error);
    }
}

const deleteUser = async (id) =>{
    try{
        const user = await User.deleteOne({_id: id});
        console.log(user);
        return user 
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (id, update) =>{
    try{
        const user = await User.updateOne({_id: id}, update);
        console.log(user);
        return user
    } catch (error) {
        console.log(error)
    }
}

module.exports = {addUser, findUsers, deleteUser, updateUser}
