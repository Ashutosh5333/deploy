
const express = require("express");
const {NoteModel} = require("../models/note.model");
const  noteRouter = express.Router();


 noteRouter.get("/", async(req,res) =>{
   const notes = await NoteModel.find()

   res.send(notes)
 })

 noteRouter.post("/create", async(req,res) =>{
     const payload = req.body;
    
     try{
         const new_note = new NoteModel(payload)
         await new_note.save();
         res.send({"msg":"Note created sucessfully"})
     }catch(err){
         console.log(err)
         res.send({"err":"Something went wrong"})
     }
 })


 noteRouter.patch("/update/:noteId", async(req,res) =>{
    //  const payload = req.body;
    const noteId = req.params.noteId
    const userId =  req.body.userId
    
     const note =await NoteModel.findOne({_id:noteId})

     if(userId !== note.userId){
        res.send("Not authorised")
     }else{
         await NoteModel.findByIdAndUpdate({_id:noteId},payload)
         res.send({"msg":"Note updated sucessfully"})
     }
 })  
  

 noteRouter.delete("/delete/:noteId", async(req,res) =>{
     const noteId = req.params.noteId;
     const userId = req.body.userId
     
     const note =await NoteModel.findOne({_id:noteId})

     if(userId !== note.userId){
        res.send("Not authorised")
     }else{
         await NoteModel.findByIdAndDelete({_id:noteId},payload)
         res.send({"msg":"note delete sucessfully"})
     }
    //  await NoteModel.findByIdAndDelete({_id:noteId})
    //  res.send({"msg":"note delete sucessfully"})
 })


 module.exports={noteRouter}