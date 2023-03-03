
import './App.css';
import axios from 'axios';
import React, { useState,useEffect } from 'react';

function App() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/patients/')
      .then(response => {
        setPatients(response.data.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleChangeContact = (e) => {
    setContact(e.target.value);
  };

  const handleChangePincode = (e) => {
    setPincode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name!=='' || address!=='' || contact!==''|| pincode!==''){

      const newPatient = {
        name: name,
        address: address,
        contact: contact,
        pincode: pincode
      };
  
      axios.post('http://localhost:5000/patients/add', newPatient)
        .then(res => console.log(res.data));
  
      setPatients([...patients, newPatient]);
      setName('');
      setAddress('');
      setContact('');
      setPincode('');
    }

  };

  const handleDelete = (id) => {
    axios.delete('http://localhost:5000/patients/' + id)
      .then(res => console.log(res.data));

    setPatients(patients.filter(patient => patient._id !== id));
  };

  const handleEdit = (id) => {
    const updatedPatient = {
      name: name,
      address: address,
      contact: contact,
      pincode: pincode
    };

    axios.post('http://localhost:5000/patients/update/' + id, updatedPatient)
      .then(res => console.log(res.data));

    setPatients(patients.map(patient => {
      if (patient._id === id) {
        return {
          _id: id,
          name: name,
          address: address,
          contact: contact,
          pincode: pincode
        };
      } else {
        return patient;
      }
    }));
    setName('');
    setAddress('');
    setContact('');
    setPincode('');
  };

  return (
    <>

<div>
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleChangeName} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={handleChangeAddress} />
        </div>
        <div>
          <label>Contact:</label>
          <input type="text" value={contact} onChange={handleChangeContact} />
        </div>
        <div>
          <label>Pincode:</label>
          <input type="text" value={pincode} onChange={handleChangePincode} />
        </div>
        <button type="submit">Add Patient</button>
      </form>
      {/* <h2>Patients List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Pincode</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>{patient.address}</td>
              <td>{patient.contact}</td>
              <td>{patient.pincode}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>


    <div>
      <h2>Patients List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Pincode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>{patient.address}</td>
              <td>{patient.contact}</td>
              <td>{patient.pincode}</td>
              <td>
                <button onClick={() => handleDelete(patient._id)}>Delete</button>
                <button onClick={() => {
                  setName(patient.name);
                  setAddress(patient.address);
                  setContact(patient.contact);
                  setPincode(patient.pincode);
                }}>Edit</button>
                <button onClick={() => {
                  setName('');
                  setAddress('');
                  setContact('');
                  setPincode('');
                }}>Cancel</button>
                <button onClick={() => handleEdit(patient._id)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </>);
}

export default App;
