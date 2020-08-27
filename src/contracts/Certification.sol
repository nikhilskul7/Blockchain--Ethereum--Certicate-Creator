pragma solidity ^0.5.0;

contract Certification{
    struct Certificate{
        string display_name;
        string org_name;
        string course_name;
    }

    mapping(bytes32 => Certificate)public certificates;

    event certificateGenerate(bytes32 _ID);

    function convert(string memory source)private pure returns(bytes32 result) {
        bytes memory tempempty=bytes(source);
        if(tempempty.length==0){
            return 0x0;
        }
        assembly{
            result:=mload(add(source,32))
        }
    }

    function generateCertificate(
        string memory _id,
        string memory _display_name,
        string memory _org_name,
        string memory _course_name)public{
            bytes32 byte_id = convert(_id);
            certificates[byte_id]=Certificate(_display_name,_org_name,_course_name) ;
            emit certificateGenerate(byte_id);
        }

    function getData(string memory _id)public view returns(string memory,string memory,string memory){
        bytes32 byte_id = convert(_id);
        Certificate memory temp = certificates[byte_id];
        return(temp.display_name,temp.org_name,temp.course_name);
    }

}