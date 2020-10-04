//const { assert } = require('chai');

const { assert } = require('chai');



const Certification=artifacts.require('./Certification.sol');
require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Certification',([deployer,author,tipper])=>{
    let obj
    before(async()=>{
        obj=await Certification.deployed()
    })
    describe('deployment',async()=>{
        it ('deploys succesfully',async()=>{
            
            const address=await obj.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
        it('has a name',async()=>{
            const name=await obj.name()
            assert.equal(name,'Nikhil Kulkarni')
        })
        
    })


    describe('certificates',async()=>{
        let result,id
        before(async()=>{
            result=await obj.generatecertificate('Nikhil K','Google','Cloud',{from:author})
            id=await obj.id()
           // console.log(id)
        })
        it('creates certificates',async()=>{
            //c=await Certification.deployed()
    
           
            //success
            assert.equal(id,1)
            const event=result.logs[0].args
            console.log(event.owner)
           // assert.equal(event.id.toNumber(),id.toNumber(),'id is correct')
             /* 
            assert.equal(event.display_name,'Nikhil K','Name is correct')
            
            assert.equal(event.org_name,'Google','orgname is correct')
            
            assert.equal(event.course_name,'Cloud','course name is correct')
            
            assert.equal(event.owner,author,'owner is correct')  */
            //failure
            await obj.generatecertificate('','','',{from:author}).should.be.rejected
        })
        it('lists certificate',async()=>{
            const list=await obj.certificates(id)
            
           // assert.equal(list.id.toNumber(),id.toNumber(),'id is correct')
             /* 
            assert.equal(list.display_name,'Nikhil K','Name is correct')
            
            assert.equal(list.org_name,'Google','orgname is correct')
            
            assert.equal(list.course_name,'Cloud','course name is correct')
            
            assert.equal(list.owner,author,'owner is correct') 
 */
        })
        let issuerBalance
        issuerBalance = await web3.eth.getBalance(author)
        issuerBalance = new web3.utils.BN(issuerBalance)


        let amount
        amount=web3.utils.toWei('1','Ether')
        amount=new web3.utils.BN(amount)


        const newBalance=issuerBalance.add(amount)


        //assert.equal(issuerBalance.toString(), newBalance.toString(), "[message]");
    })
})





