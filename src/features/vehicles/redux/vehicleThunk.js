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
  },
);

export const addVehicle = createAsyncThunk(
  'vehicles/addVehicle',
  async (arg, thunkAPI) => {
    try {
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

      const newVehicle = await firestore.collection('Vehicles').add(vehicle);

      return { ...vehicle, id: newVehicle.id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const editVehicle = createAsyncThunk(
  'vehicles/editVehicle',
  async (editedVehicle, thunkAPI) => {
    try {
      const currUser = thunkAPI.getState().auth.user;

      const vehicle = {
        ...editedVehicle,
        updatedBy: currUser.id,
        updated: firestoreFunctions.FieldValue.serverTimestamp(),
      };

      await firestore
        .collection('Vehicles')
        .doc(editedVehicle.id)
        .update(vehicle)
        .catch((err) => {});

      return editedVehicle;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteVehicle = createAsyncThunk(
  'vehicles/deleteVehicle',
  async (deletedVehicleId, thunkAPI) => {
    try {
      const currUser = thunkAPI.getState().auth.user;

      await firestore.collection('Vehicles').doc(deletedVehicleId).update({
        active: false,
        deletedBy: currUser.id,
        deleted: firestoreFunctions.FieldValue.serverTimestamp(),
      });
      return deletedVehicleId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
