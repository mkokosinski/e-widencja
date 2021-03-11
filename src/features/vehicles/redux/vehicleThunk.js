import { createAsyncThunk } from '@reduxjs/toolkit';
import { firestore, firestoreFunctions } from '../../../app/firebase/firebase';

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (arg = 1, thunkAPI) => {
    try {
      const currUser = thunkAPI.getState().auth.user;

      const vehicles = [];
      const coll = await firestore
        .collection('Vehicles')
        .where('companyId', '==', currUser.companyId)
        .where('active', '==', true)
        .get();

      coll.forEach((doc) => {
        const data = doc.data();

        const vehicle = {
          ...data,
          id: doc.id,
        };

        if (data.created) {
          vehicle.created = data.created.toDate().toString();
        }

        if (data.updated) {
          vehicle.updated = data.updated.toDate().toString();
        }

        if (data.deleted) {
          data.deleted = data.deleted.toDate().toString();
        }

        vehicles.push(vehicle);
      });

      return vehicles;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addVehicle = createAsyncThunk(
  'vehicles/addVehicle',
  async (arg, thunkAPI) => {
    const currUser = thunkAPI.getState().auth.user;

    const vehicle = {
      brand: arg.brand,
      checkupDate: arg.checkupDate,
      mileage: arg.mileage,
      model: arg.model,
      name: arg.name,
      registrationNumber: arg.registrationNumber,
      type: arg.type,
      companyId: currUser.companyId,
      createdBy: currUser.id,
      created: firestoreFunctions.FieldValue.serverTimestamp(),
      active: true,
    };

    return await firestore
      .collection('Vehicles')
      .add(vehicle)
      .catch((err) => {
        console.error(err);
        return thunkAPI.rejectWithValue(err.toString());
      });
  }
);

export const editVehicle = createAsyncThunk(
  'vehicles/editVehicle',
  async (arg, thunkAPI) => {
    const currUser = thunkAPI.getState().auth.user;

    const vehicle = {
      brand: arg.brand,
      checkupDate: arg.checkupDate,
      mileage: arg.mileage,
      model: arg.model,
      name: arg.name,
      registrationNumber: arg.registrationNumber,
      type: arg.type,
      updatedBy: currUser.id,
      updated: firestoreFunctions.FieldValue.serverTimestamp(),
    };

    return await firestore
      .collection('Vehicles')
      .doc(arg.id)
      .update(vehicle)
      .catch((err) => {
        return thunkAPI.rejectWithValue(err);
      });
  }
);

export const deleteVehicle = createAsyncThunk(
  'vehicles/deleteVehicle',
  async (arg, thunkAPI) => {
    const currUser = thunkAPI.getState().auth.user;

    return await firestore
      .collection('Vehicles')
      .doc(arg)
      .update({
        active: false,
        deletedBy: currUser.id,
        deleted: firestoreFunctions.FieldValue.serverTimestamp(),
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue(err);
      });
  }
);
