const router = require('express').Router();
let Patient = require('../model/patient.js');

router.route('/').get(async(req, res) => {
  try{
    const patient= await Patient.find({})
    

    res.status(200).json({success: true, data: patient})

}catch(error){
    res.status(500).json({ success: false, message: error})
}

});

router.route('/:id').get(async (req, res) => {
  

  try{
    const patient = await Patient.findById(req.params.id);

    res.status(200).json({success: true, data: patient})

  }catch(error){
      res.status(500).json({ success: false, message: error})
  }

});

router.route('/add').post(async (req, res) => {
  const newPatient= await Patient.create(req.body);
  res.status(200).json("patient created")
});

router.route('/:id').delete(async (req, res) => {
  try{

    const delPatient=await Patient.findByIdAndDelete(req.params.id)
    res.status(200).json("patient deleted")
  } catch(error){ 
    res.status(500).json({ success: false, message: error})

  }
    
});

router.route('/update/:id').post(async (req, res) => {
  
  try{
    const patient= await Patient.findById(req.params.id)

    patient.name = req.body.name;
    patient.address = req.body.address;
    patient.contact = req.body.contact;
    patient.pincode = req.body.pincode;

    const savedPatient= await patient.save()
    res.status(200).json("patient updated")

  }catch(error){
    res.status(500).json({ success: false, message: error})
  }

    
});

module.exports = router;
