var express = require('express');
var router=express.Router();

const connection=require('../db')

router.post("/add",async(req,res)=>{
     console.log(req.body)
    var a='"empty","half"'
    let vehicleType=req.body.vehicleType || 'b'
    let status="half"
    let temp=0;
    let vehicleNumber=req.body.vehicleNumber || "AP 39 CU 8522"
    connection.query(`SELECT * FROM park_slots where current_status in(${a})`,(err, rows, fields) => {
    if (err) throw err
    console.log('The  data  is: ', rows)

    for(let i=0;i<rows.length;i++){
        if(rows[i].current_status=="empty"){
            
            if(vehicleType=='c' && rows[i].slot_id!==5){
                status="full"
            }
            
        connection.query(`UPDATE park_slots set current_status='${status}',contains='${vehicleType}',numbers_of_vehicle='${vehicleNumber}' WHERE slot_id=${rows[i].slot_id}`,(err, rows, fields) => {
            if (err) throw err
            console.log("updated");
        })
        res.send("updated db")
        break;
             
        }
        else{

            console.log("half");
            if(vehicleType=='c' && rows[i].slot_id==5){
                if(!rows[i].contains.includes('bb')&&!rows[i].contains.includes('c')){
                    console.log("one bike and one car")
                    status ="full"
                    temp=1
                     

                }
                
            }
            else if(vehicleType=='b'){
                console.log("entered")
                if(rows[i].slot_id==5 && !rows[i].contains.includes('bbb') && (!rows[i].contains.includes('cb') || !rows[i].contains.includes('bc'))){
                    status="half"
                console.log("entered in if")

                    if(rows[i].contains.includes('bb') || rows[i].contains.includes('c'))
                      status="full"

                    temp=1
                }
                else if(!rows[i].contains.includes('bb') && rows[i].slot_id!==5){    
                    
                console.log("entered in elif")
                    
                       status="full"
                    temp=1
                }
                
            }

            
            if(temp!==0){
                connection.query(`UPDATE park_slots set current_status='${status}',contains='${rows[i].contains}${vehicleType}',numbers_of_vehicle='${rows[i].numbers_of_vehicle},${vehicleNumber}' WHERE slot_id=${rows[i].slot_id}`,(err, rows, fields) => {
                    if (err) throw err
                    console.log("updated");
                })
                res.send("updated db")
                break; 
            }
            else{
                console.log("slots is full sorry for the inconvinece")
                // res.send("all slots are full sorry for the inconvinece")

            }


        }
    }

    connection.query(`SELECT * FROM park_slots`,(err, rows, fields) => {
        if (err) throw err
        console.log('final data  is: ', rows)

    })    
    

    

  })
})


router.get('/',async(req, res)=>{
    connection.query(`SELECT * FROM park_slots`,(err, rows, fields) => {
        if (err) throw err
        console.log('final data  is: ', rows)
        res.status(200).send(rows);

    }) 
})
router.post("/search",async(req,res) => {
    
    console.log("request is ",req.body)
    let vehichle_no=req.body.vehichle_no;
    connection.query(`SELECT * FROM park_slots where numbers_of_vehicle like ('%${vehichle_no}%') `,(err, rows, fields) => {
        if (err) throw err
        console.log('final data  is: ', rows)
        if (rows.length>0){
        res.status(200).send(rows);

        }
        res.status(200).send("VEHICLE NOT FOUND")
    }) 
})

  

module.exports=router;