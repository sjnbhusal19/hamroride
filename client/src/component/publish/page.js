'use client';
import React from 'react';
import { Button, Input, DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useFormik } from 'formik';
import * as Yup from "yup";
import toast from 'react-hot-toast';


const publishRideSchema = Yup.object().shape({
  leavingFrom: Yup.string()
    .min(2, 'Too Short')
    .required('Starting place is required.'),
  goingTo: Yup.string()
    .min(2, 'Too Short')
    .required('Destination is required.'),
  publishDate: Yup.object()
    .required('Date is required.'),
  numberOfPassenger: Yup.number()
    .required('Number of passengers is required.'),
  price: Yup.string()
    .required('Price is required'),
});

const PublishRide = () => {
  const formik = useFormik({
    initialValues: {
      leavingFrom: '',
      goingTo: '',
      publishDate: null,
      numberOfPassenger:1,
      price: ''
    },
    validationSchema: publishRideSchema,
    onSubmit: values => {
      publishRide(values);
    }
  });

  const publishRide = async(values)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };
  const response = await fetch('http://localhost:4000/publishride', requestOptions);
  const data = await response.json()

if(response.status == '200'){
  toast.success(data.msg)
}else{
  toast.error(data.msg)
}

}
  

  const handlePassengerChange = (count) => {
    const newCount = formik.values.numberOfPassenger + count;
    formik.setFieldValue('numberOfPassenger', newCount < 1 ? 1 : newCount);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">Publish A Ride</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          <div className="mb-4">
            <Input
              type="text"
              label="Leaving From"
              variant="bordered"
              isRequired
              id="leavingFrom"
              name="leavingFrom"
              onChange={formik.handleChange}
              value={formik.values.leavingFrom}
            />
            {formik.touched.leavingFrom && formik.errors.leavingFrom ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.leavingFrom}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Going To"
              variant="bordered"
              isRequired
              id="goingTo"
              name="goingTo"
              onChange={formik.handleChange}
              value={formik.values.goingTo}
            />
            {formik.touched.goingTo && formik.errors.goingTo ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.goingTo}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <DatePicker
              label="Date"
              minValue={today(getLocalTimeZone())}
              value={formik.values.publishDate}
              onChange={(value) => formik.setFieldValue('publishDate', value)}
              className="max-w-full"
              isRequired
            />
            {formik.touched.publishDate && formik.errors.publishDate ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.publishDate}</div>
            ) : null}
          </div>
          {/* <div className="mb-4">
            <Input
              isReadOnly
              label="Number of Booked Seats"
              type="text"
              variant="bordered"
              defaultValue="default"
            />
          </div>
          <div className="mb-4">
            <Input
              isReadOnly
              label="Number of Remaining Seats"
              type="text"
              variant="bordered"
              defaultValue="default"
            />
          </div> */}
          <div className="mb-4 flex">
            <label className="block font-medium text-gray-700 mb-2">Passenger</label>
            <div className="flex items-center px-3 space-x-2">
              <Button
                type="button"
                size='sm'
                className="bg-blue-400 text-white rounded-xl h-8  w-4"
                onClick={() => handlePassengerChange(-1)}
              >
                -
              </Button>
              <span>{formik.values.numberOfPassenger}</span>
              <Button
                type="button"
                size='sm'
                className="bg-blue-400 text-white rounded-xl   "
                onClick={() => handlePassengerChange(1)}
              >
                +
              </Button>
            </div>
            {formik.touched.numberOfPassenger && formik.errors.numberOfPassenger ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.numberOfPassenger}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Price"
              variant="bordered"
              isRequired
              id="price"
              name="price"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
            ) : null}
          </div>
          <div className='flex item-center justify-center mt-2 '>
          <Button type="submit" className="  bg-blue-600 text-white w-14 ">Publish</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PublishRide;
