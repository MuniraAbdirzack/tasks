const {IncomingForm} =require('formidable')
const { readTasksFromFile, writeTasksToFile } = require("../utils/fileHandler")

exports.getTasks = (req,res) =>{
    const tasks = readTasksFromFile()
    res.writeHead(200,{ 'content-type': 'application/json'})
    res.end(JSON.stringify(tasks))
}
exports.createTasks = (req, res) =>{
    const  form = new IncomingForm();
    form.parse(req,(err,fields, files)=>{
        if(err){
            res.writeHead(400,{'content-type':'application/json'});
            res.end(JSON.stringify({
                message: 'Error parsing form'
            }))
            return;
        }

        const image =files.images[0];
        const tasks =readTasksFromFile()
        const newTask = {
            id: Date.now(),
            title:fields.title,
            descriptio:fields?.descriptio || '',
            status:fields ?.status || 'pending',
            image:files.image ? `/uploads/${image.originalFilename}`: null,
        }
        tasks.push(newTask);

        writeTasksToFile(tasks)

        if (files.image){
             copyFileSync(files.image.filepath, path.join(__dirname, '../uploads'+fields.image.originalFilename))
             res.end(JSON.stringify(newTask));
        }

    })

}



exports.deleteTask = (req, res) => {
    const tasks = readTasksFromFile();
    const taskId = parseInt(req.url.split('/').pop());
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        res.writeHead(404, { 'content-type': 'application/json'});
        res.end(JSON.stringify({
            message: 'Task not found'
        }))
        return;
    }

    const updatedTasks = tasks.filter(task => task.id !== taskId);
    writeTasksToFile(updatedTasks);
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({
        message: 'Task successfully deleted'
    }));
}

