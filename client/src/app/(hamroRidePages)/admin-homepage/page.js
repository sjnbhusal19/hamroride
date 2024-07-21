"use client";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { userDetails } = useSelector(state => state.user);
  const { firstName, lastName, role } = userDetails;
  const [kycList, setKycList] = useState([]);
  const [singleKyc, setSingleKyc] = useState({});

  const fetchKycList = async () => {
    const { data } = await axios.get('http://localhost:4000/userkyc');
    return data;
  };

  const refreshKycList = async () => {
    const data = await fetchKycList();
    setKycList(data);
  };

  useEffect(() => {
    refreshKycList();
  }, []);

  const handleViewKyc = async (id) => {
    const { data } = await axios.get(`http://localhost:4000/userkyc/${id}`);
    setSingleKyc(data);
  };

  const acceptStatus = async (id) => {
    await axios.patch(`http://localhost:4000/userkyc/${id}`);
    refreshKycList();
  };

  const rejectStatus = async (id) => {
    await axios.patch(`http://localhost:4000/userkycr/${id}`);
    refreshKycList();
  };

  return (
    <div className="text-blue-600 text-2xl text-center">
      Admin-Dashboard
      <div>
        <div className="flex w-full flex-col">
          <Tabs aria-label="Options">
            <Tab key="completelist" title="All">
              <Table aria-label="Complete list of KYC">
                <TableHeader>
                  <TableColumn>FULL NAME</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>View Details</TableColumn>
                  <TableColumn>Change Status</TableColumn>
                </TableHeader>
                <TableBody>
                  {kycList.length > 0 && kycList.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{userDetails.firstName} {userDetails.lastName}</TableCell>
                      <TableCell>{userDetails.role}</TableCell>
                      <TableCell>{item.kycVerifiedStatus}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleViewKyc(item._id)}>View</Button>
                      </TableCell>
                      <TableCell>
                        <Button className="bg-green-500 m-3" onClick={() => acceptStatus(item._id)}>Accept</Button>
                        <Button color="danger" onClick={() => rejectStatus(item._id)}>Reject</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Tab>
            <Tab key="pending" title="Pending">
              <Table aria-label="Pending List of KYC">
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>View Details</TableColumn>
                  <TableColumn>Change Status</TableColumn>
                </TableHeader>
                <TableBody>
                  {kycList.filter(item => item.kycVerifiedStatus === 'pending').map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{userDetails.firstName} {userDetails.lastName}</TableCell>
                      <TableCell>{userDetails.role}</TableCell>
                      <TableCell>{item.kycVerifiedStatus}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleViewKyc(item._id)}>View</Button>
                      </TableCell>
                      <TableCell>
                        <Button className="bg-green-500 m-3" onClick={() => acceptStatus(item._id)}>Accept</Button>
                        <Button color="danger" onClick={() => rejectStatus(item._id)}>Reject</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Tab>
            <Tab key="acceptedlist" title="Accepted">
              <Table aria-label="Accepted List of KYC">
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>View Details</TableColumn>
                  <TableColumn>Change Status</TableColumn>
                </TableHeader>
                <TableBody>
                  {kycList.filter(item => item.kycVerifiedStatus === 'accepted').map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{userDetails.firstName} {userDetails.lastName}</TableCell>
                      <TableCell>{userDetails.role}</TableCell>
                      <TableCell>{item.kycVerifiedStatus}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleViewKyc(item._id)}>View</Button>
                      </TableCell>
                      <TableCell>
                        <Button className="bg-green-500 m-3" onClick={() => acceptStatus(item._id)}>Accept</Button>
                        <Button color="danger" onClick={() => rejectStatus(item._id)}>Reject</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Tab>
            <Tab key="rejected" title="Rejected">
              <Table aria-label="Rejected List of KYC">
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>View Details</TableColumn>
                  <TableColumn>Change Status</TableColumn>
                </TableHeader>
                <TableBody>
                  {kycList.filter(item => item.kycVerifiedStatus === 'rejected').map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{userDetails.firstName} {userDetails.lastName}</TableCell>
                      <TableCell>{userDetails.role}</TableCell>
                      <TableCell>{item.kycVerifiedStatus}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleViewKyc(item._id)}>View</Button>
                      </TableCell>
                      <TableCell>
                        <Button className="bg-green-500 m-3" onClick={() => acceptStatus(item._id)}>Accept</Button>
                        <Button color="danger" onClick={() => rejectStatus(item._id)}>Reject</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      </div>
      <div className="text-left mt-4">
        <h2>KYC Details:</h2>
        {singleKyc ? (
          <div className="p-4 border rounded-md">
            <p><strong>Father's Name:</strong> {singleKyc.fatherName}</p>
            <p><strong>Permanent Address:</strong> {singleKyc.permanentAddress}</p>
            <p><strong>Driving License Number:</strong> {singleKyc.drivingLicenseNumber}</p>
            <p><strong>Citizenship Number:</strong> {singleKyc.citizenshipNumber}</p>
            <p><strong>Is KYC Verified:</strong> {singleKyc.isKycVerified ? 'Yes' : 'No'}</p>
          </div>
        ) : (
          <p>No KYC selected.</p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
