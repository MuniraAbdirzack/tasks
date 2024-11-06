const { getTasks, createTasks, updateTask, deleteTask } = require("../controllers/taskControllers");

const taskRoutes=(req,res)=>{
    if(req.method =='GET'){
        getTasks(req,res);
    }else if(req.method == 'POST'){
        createTasks(req,res)
    }else if (req.method == 'PATCH'){
        updateTask(req,res)
    }else if(req.method == 'DELETE'){
        deleteTask(req,res)
    }else{
        res.writeHead(404, 'Data not found ',{'content-type':'application/json'})
        res.end(JSON.stringify({
            message:"unknown Method required."
        }))
    }
}
module.exports =taskRoutes;