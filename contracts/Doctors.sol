// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Doctors {
    uint256 public DoctorCount = 0;
    // Patients Model
    struct Doctor {
        uint256 doctorID;
        string name;
        string specialistType;
        string phone;
        string email;
        string addr;
    }

    mapping(uint256 => Doctor) public doctors;

    // Broadcasting when an doctor event is created
    event DoctorCreated(
        uint256 doctorID,
        string name,
        string specialistType,
        string phone,
        string email,
        string addr
    );

    // Constructor which initializes default values
    constructor() public {
        createDoctor(
            "Siddhi",
            "Psychologist",
            "8054845360",
            "siddhi511@gmail.com",
            "Ghaziabad"
        );
    }

    // A funnction to create doctors

    function createDoctor(
        string memory _name,
        string memory _specialistType,
        string memory _phone,
        string memory _email,
        string memory _addr
    ) public {
        DoctorCount++;
        doctors[DoctorCount] = Doctor(
            DoctorCount,
            _name,
            _specialistType,
            _phone,
            _email,
            _addr
        );
        emit DoctorCreated(
            DoctorCount,
            _name,
            _specialistType,
            _phone,
            _email,
            _addr
        );
    }
}
