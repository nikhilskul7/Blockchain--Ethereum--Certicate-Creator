


const Certification=artifacts.require('./Certification.sol');

contract("Certification",accounts=>{
    let obj={};

    before(async ()=>{
        obj=await Certification.deployed()
    })

    describe('certificate generated',async()=>{
        let result
        before(async()=>{
            result=await obj.generateCertificate('')
        
         } )})
      
    
 } )