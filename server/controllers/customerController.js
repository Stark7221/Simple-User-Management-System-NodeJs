const Customer = require("../models/Customer");
const mongoose = require("mongoose");

exports.homepage = async (req,res)=>{
    const locals ={
        title: "NodeJs",
        description:"Free NodeJs UserManagement System"
    }
    try {
        const customers = await Customer.find({}).limit(22);
        res.render("index",{locals,customers});
    } 
    catch (error) {
        console.log(error);
    }
}

exports.addCustomer = async(req,res)=>{
    const locals = {
        title: "Add New Customer - NodeJs",
        description:"Free NodeJs UserManagement System"
    }
    res.render("customers/add",locals)
}

exports.postCustomer = async(req,res)=>{
    console.log(req.body);
    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        details:req.body.details,
        tel: req.body.tel,
        email: req.body.email,
    });
    try {
        await Customer.create(newCustomer);
        await req.flash("info", "New customer has been added")
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

exports.view = async(req,res)=>{
    try {
        const customer = await Customer.findOne({_id:req.params.id})
    const locals = {
        title: "View Customer Data",
        description:"Free NodeJs UserManagement System"
    }
    res.render("customers/view",{locals,customer})
    } catch (error) {
        console.log(error);
    }
}

exports.edit = async(req,res)=>{
    try {
        
        const customer = await Customer.findOne({_id:req.params.id})
    const locals = {
        title: "Edit Customer Data",
        description:"Free NodeJs UserManagement System"
    }
    res.render("customers/edit",{locals,customer});
    } catch (error) {
        console.log(error);
    }
}

exports.editPost = async(req,res)=>{
   try {
    console.log("mongo sorgu");
    await Customer.findByIdAndUpdate(req.params.id,{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.details,
        updatedAt: Date.now()
    })
    console.log("sorgu ok");
    res.redirect(`/edit/${req.params.id}`);
    console.log("yönlendirme");

   } catch (error) {
    console.log(error);
   }
}

exports.deletePost = async(req,res)=>{
    try {
        await Customer.deleteOne({_id:req.params.id});
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
}

exports.search = async ( req,res)=>{

    const locals = {
        title: "Edit Customer Data",
        description:"Free NodeJs UserManagement System"
    }

    try {
    let searchTerm = req.body.searchTerm;
    const searchSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g,"");

    const customers = await Customer.find({
        $or:[
            {firstName:{$regex:new RegExp(searchSpecialChar,"i")}},
            {lastName:{$regex:new RegExp(searchSpecialChar,"i")}},
        ]
    });

    res.render("search",{
        customers,
        locals
    })
    } catch (error) {
        console.log(error);
    }
}





