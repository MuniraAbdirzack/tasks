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

exports.updateTask = (req,res) =>{
    res.end(JSON.stringify({
        message: 'not implemented',
    }))

}
exports.deleteTask = (req,res) =>{
    
}
