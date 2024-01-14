// StudentForm.tsx
"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import { TextField, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { initialFormData } from "@/common/types";
import axios, { AxiosError, AxiosResponse } from "axios";

const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState<initialFormData>({
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    grade: "",
    email: "",
    contactNumber: "",
    address: "",
  });

  useLayoutEffect(()=>{
    const isLogin = localStorage.getItem('isLogin');
    if(isLogin !== 'true'){
      router.push('/')
    }
  })

  const params = useParams<{ studentId: string }>();
  const router = useRouter();

  useEffect(() => {
    if (parseInt(params.studentId) !== 0) {
      axios
        .get(`/api/students/${params.studentId}`)
        .then(({ data }: AxiosResponse<any, any>) => {
          const myData = data?.data;
          const thisData: initialFormData = {
            firstName: myData.firstName,
            lastName: myData.lastName,
            age: parseInt(myData.age),
            gender: myData.gender,
            grade: myData.grade,
            email: myData.email,
            contactNumber: myData.contactNumber,
            address: myData.address,
          };
          myData && setFormData(thisData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (parseInt(params.studentId) === 0) {
      axios
        .post("/api/students", formData)
        .then((response) => {
          alert("form saved");
          router.push(`/studentgrid`);
        })
        .catch((error) => {
          let message: string = "";
          if (error instanceof Error) {
            message = error.message;
          }
          if (error instanceof AxiosError) {
            message = error.response?.data.message || "Server Unavailable";
          }
          alert(message);
        });
    } else {
      axios
        .put(`/api/students/${params.studentId}`, formData)
        .then((response) => {
          alert("form saved");
          router.push(`/studentgrid`);
        })
        .catch((error) => {
          let message: string = "";
          if (error instanceof Error) {
            message = error.message;
          }
          if (error instanceof AxiosError) {
            message = error.response?.data.message || "Server Unavailable";
          }
          alert(message);
        });
    }
  };

  return (
    <div className="mx-60 my-32">
      <Typography variant="h3" component="h2">
      {parseInt(params.studentId) === 0 ? "Add New Students":"Edit New Students"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              placeholder="First Name"
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder="Last Name"
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder="Age"
              fullWidth
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.gender}
              onChange={handleChange}
              fullWidth
              name="gender"
              placeholder="gender"
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder="Grade"
              fullWidth
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder="Email"
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder="Contact Number"
              fullWidth
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Address"
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{ background: "#1565C0" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default StudentForm;
