pragma solidity ^0.5.0;

contract Certification{
    string public name;
    mapping(uint => Certificate)public certificates;

    struct Certificate{
        //uint id;
        string display_name;
        string org_name;
        string course_name;
        address payable owner;
    }
    uint public id = 0;
    constructor()public{
     name="Nikhil Kulkarni";   
    }

    event certificateGenerate(uint id);

    /* function convert(string memory source)private pure returns(bytes32 result) {
        bytes memory tempempty=bytes(source);
        if(tempempty.length==0){
            return 0x0;
        }
        assembly{
            result:=mload(add(source,32))
        } */
    
    event CertificateGenerated(
        
        string name,
        string orgName,
        string courseName,
        address payable owner
        
    );
/*  /
    function generateCertificate(
        
        string memory _display_name,
        string memory _org_name,
        string memory _course_name)public{
           require(bytes(_display_name).length > 0);
        require(bytes(_org_name).length > 0);
        require(bytes(_course_name).length > 0);
        id ++;
       // certificates[id] = Certificate(_display_name, _org_name, _course_name, msg.sender);
        emit CertificateGenerated(_display_name, _org_name, _course_name, msg.sender);(id,_display_name, _org_name, _course_name, msg.sender);
            
            } */





        function generatecertificate(string memory _name,string memory org_name,string memory course_name)public{
            require(bytes(_name).length > 0);
        require(bytes(org_name).length > 0);
        require(bytes(course_name).length > 0);
            id++;
           certificates[id]=  Certificate(_name,org_name,course_name,msg.sender);
            emit CertificateGenerated(_name, org_name, course_name, msg.sender);
        }
   

}