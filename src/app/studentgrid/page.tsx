"use client";
import DataGridBase from "@/common/gridBase";
import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios, { AxiosResponse } from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [data, setData] = useState<any>();
  const router = useRouter();
  const [fetch, setFetch] = useState<boolean>(false);

  useLayoutEffect(()=>{
    const isLogin = localStorage.getItem('isLogin');
    if(isLogin !== 'true'){
      router.push('/')
    }
  });

  const handleEdit = (id: string) => {
    router.push(`/student/${id}`);
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`api/students/${id}`)
      .then((res: AxiosResponse<any, any>) => {
        alert("deleted successfully ");
        setFetch(!fetch);
      })
      .catch((err: any) => {
        alert("something went wrong");
      });
  };

  const studentColumns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "age", headerName: "Age", type: "number", width: 100 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    {
      field: "edit",
      headerName: "edit",
      flex: 1,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              handleEdit(params.row._id);
            }}
          >
            Edit
          </Button>
        </div>
      ),
    },
    {
      field: "delete",
      headerName: "delete",
      flex: 1,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get(`/api/students`)
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        alert("something went wrong");
      });
  }, [fetch]);

  const handleAdd = () => {
    router.push(`/student/0`);
  };

  return (
    <div>
      <Button onClick={handleAdd} style={{width:"200px", background:"#1565C0"}} variant="contained">Add</Button>
      {data && <DataGridBase columns={studentColumns} rows={data} />}
    </div>
  );
}
