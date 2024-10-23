const Task = require('../model/taskModel')

const addTask = async (req, res) => {
    try {

        const { name } = req.body;
        const task = new Task({ name: name });
        await task.save();
        res.json({ mess: "add success" })
    } catch (error) {
        console.log(error)
    }
};
const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find();

        return res.json({ tasks });
    } catch (error) {
        console.log(error)
    }
};
const deleteTask = async (req,res) => {
    try {
        const   { _id} = req.body
        console.log(_id)
        const result = await Task.findByIdAndDelete(_id);
        if (result) {
            res.json({ mess: "delete success" })
        }
        else {
            res.json({ mess: "delete unsuccess" })
        }
    } catch (error) {

    }
};
const editTask = async (req,res) => {
    try {
        const {_id,newName} = req.body
      const result =   await Task.findByIdAndUpdate(_id, { name: newName },{new:true});
      if (result) {
        res.json({ mess: "update success" })
    }
    else {
        res.json({ mess: "update unsuccess" })
    }
    } catch (error) {

    }
};
const changeStatus = async (req,res) => {
    try {
        const {_id} = req.body;
        const task = await Task.findById(_id);
        if(task)
        {
        task.status = true; 
        await task.save();
        res.json({ mess: "status change success" })
        }
        else{
            res.json({ mess: "status change unsuccess" })
        }
    } catch (error) {

    }

};
module.exports = {
    addTask,
    editTask,
    deleteTask,
    getAllTask,
    changeStatus
};