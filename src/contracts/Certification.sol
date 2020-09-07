pragma solidity ^0.5.0;

contract Certification{
    struct Certificate{
        string display_name;
        string org_name;
        string course_name;
        address payable owner;
    }
    uint public id = 0;
   
    mapping(uint => Certificate)public certificates;

    event certificateGenerate(uint id);

    function convert(string memory source)private pure returns(bytes32 result) {
        bytes memory tempempty=bytes(source);
        if(tempempty.length==0){
            return 0x0;
        }
        assembly{
            result:=mload(add(source,32))
        }
    }
    event CertificateGenerated(
        
        string name,
        string orgName,
        string courseName,
        address payable owner
        
    );

    function generateCertificate(
        
        string memory _display_name,
        string memory _org_name,
        string memory _course_name)public{
            // Require a valid name
        require(bytes(_display_name).length > 0);
        // Require a valid price
        require(bytes(_org_name).length > 0);
        require(bytes(_course_name).length > 0);
        // Increment product count
        id ++;
        // Create the product
        certificates[id] = Certificate(_display_name, _org_name, _course_name, msg.sender);
        // Trigger an event
        emit CertificateGenerated(_display_name, _org_name, _course_name, msg.sender);(id,_display_name, _org_name, _course_name, msg.sender);
            
            }
   

}