import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_TablePagination,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable,
  MRT_TableContainer,
} from 'material-react-table';
import { IconButton, Box, Button, Typography, Tooltip } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { API_URL } from "../config/index";
import Layout from "../components/Layout";
import AxiosInstance from "./Axios";
import { useSelector } from "react-redux";

const Dashboard1 = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const GetData = () => {
    AxiosInstance.get(`profiles/`).then((res) => {
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const columns = useMemo(
    () => [
      {
        accessorKey: "picture",
        header: "Profile Picture",
        size: 100,
        Cell: ({ row }) => (
          <Link to={`/profile/${row.original.id}`}>
            <img
              src={`${API_URL}${row.original.picture}`}
              alt={row.original.name}
              style={{ width: "40px", borderRadius: "50%" }}
            />
          </Link>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "designation",
        header: "Designation",
        size: 150,
      },
      {
        accessorKey: "organisation",
        header: "Organisation",
        size: 200,
      },
      {
        accessorKey: "email",
        header: "Work Email",
        size: 200,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        size: 100,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
            <IconButton
              color="secondary"
              component={Link}
              to={`/edit/${row.original.id}`}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              color="error"
              component={Link}
              to={`/delete/${row.original.id}`}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [API_URL]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    initialState: { showGlobalFilter: true },
  });

  return (
    <Layout>
      <Box sx={{ border: 'gray 2px dashed', padding: '16px' }}>
        {/* Our Custom External Top Toolbar */}
        <Box
          sx={(theme) => ({
            display: 'flex',
            backgroundColor: 'inherit',
            borderRadius: '4px',
            flexDirection: 'row',
            gap: '16px',
            justifyContent: 'space-between',
            padding: '24px 16px',
            '@media max-width: 768px': {
              flexDirection: 'column',
            },
          })}
        >
          <Box>
            <Button
              color="primary"
              onClick={() => {
                alert('Add User');
              }}
              variant="contained"
            >
              Create New Account
            </Button>
          </Box>
          <MRT_GlobalFilterTextField table={table} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MRT_ToggleFiltersButton table={table} />
            <MRT_ShowHideColumnsButton table={table} />
            <MRT_ToggleDensePaddingButton table={table} />
            <Tooltip title="Print">
              <IconButton onClick={() => window.print()}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        {/* Some Page Content */}
        <Typography p="16px 4px">
          {
            "Hey, I'm some page content. I'm just one of your normal components between your custom toolbar and the MRT Table below"
          }
        </Typography>
        {/* The MRT Table with no toolbars built-in */}
        <MRT_TableContainer table={table} />
        {/* Our Custom Bottom Toolbar */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <MRT_TablePagination table={table} />
          </Box>
          <Box sx={{ display: 'grid', width: '100%' }}>
            <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard1;
