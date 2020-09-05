import React, { useEffect } from 'react';
import Layout from './features/layout/Layout';
import { useDispatch } from 'react-redux';
import { fetchRecords } from './features/records/recordsSlice';
import { fetchVehicles } from './features/vehicles/vehiclesSlice';
import { fetchUsers } from './features/users/usersSlice';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(fetchRecords());
      dispatch(fetchVehicles());
      dispatch(fetchUsers());
  });

  return <Layout />;
};

export default App;
