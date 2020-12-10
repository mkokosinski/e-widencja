import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { selectFilters } from '../templates/filterSlice';
import { firestore, firestoreFunctions } from '../../app/firebase/firebase';
import { FETCH_STATUS } from '../../utils/fetchUtils';
import { toast } from 'react-toastify';

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (arg = 1, thunkAPI) => {
    const currUser = thunkAPI.getState().auth.user;

    const vehicles = [];
    const coll = await firestore
      .collection('Vehicles')
      .where('companyId', '==', currUser.companyId)
      .where('active', '==', true)
      .get()
      .catch((err) => {
        console.log(err);
        return thunkAPI.rejectWithValue('Err');
      });

    coll.forEach((doc) => {
      const data = doc.data();

      const vehicle = {
        ...data,
        id: doc.id
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
      active: true
    };

    return await firestore
      .collection('Vehicles')
      .add(vehicle)
      .catch((err) => {
        console.log(err);
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
      updated: firestoreFunctions.FieldValue.serverTimestamp()
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

    firestore
      .collection('Vehicles')
      .doc(arg)
      .update({
        active: false,
        deletedBy: currUser.id,
        deleted: firestoreFunctions.FieldValue.serverTimestamp()
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue(err);
      });
  }
);

const sortMethods = {
  Nazwa: {
    asc: (a, b) => a.name.localeCompare(b.name),
    desc: (a, b) => b.name.localeCompare(a.name)
  },
  Producent: {
    asc: (a, b) => a.brand.localeCompare(b.brand),
    desc: (a, b) => b.brand.localeCompare(a.brand)
  },
  Przebieg: {
    asc: (a, b) => b.mileage - a.mileage,
    desc: (a, b) => a.mileage - b.mileage
  }
};

export const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    status: 'idle',
    items: [],
    error: null,
    sortFunc: { name: 'Nazwa', condition: 'asc' },
    sortCases: [
      {
        title: 'Nazwa',
        items: [
          { label: 'a-z', condition: 'asc' },
          { label: 'z-a', condition: 'desc' }
        ]
      },
      {
        title: 'Producent',
        items: [
          { label: 'a-z', condition: 'asc' },
          { label: 'z-a', condition: 'desc' }
        ]
      },
      {
        title: 'Przebieg',
        items: [
          { label: 'malejąco', condition: 'asc' },
          { label: 'rosnąco', condition: 'desc' }
        ]
      }
    ]
  },
  reducers: {
    setSortFunc: (state, action) => {
      console.log(action);
      const { payload } = action;
      const entry = Object.entries(payload)[0];

      state.sortFunc = { name: entry[0], condition: entry[1] };
    }
  },
  extraReducers: {
    [fetchVehicles.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [fetchVehicles.fulfilled]: (state, action) => {
      state.status = FETCH_STATUS.SUCCESS;
      state.items = [...action.payload];
    },

    [fetchVehicles.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.payload;
    },
    [addVehicle.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [addVehicle.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      toast.success('Poprawnie dodano nowy pojazd');
    },

    [addVehicle.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.payload;
      toast.error(action.payload);
    },
    [editVehicle.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [editVehicle.fulfilled]: (state, { payload }) => {
      state.status = FETCH_STATUS.SUCCESS;
      toast.success('Poprawnie zmieniono pojazd');
    },

    [editVehicle.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.payload;
      toast.error(action.payload);
    },
    [deleteVehicle.pending]: (state, action) => {
      state.status = FETCH_STATUS.LOADING;
    },

    [deleteVehicle.fulfilled]: (state, { payload }) => {
      state.items = state.items.filter((veh) => veh.id !== payload);
      state.status = FETCH_STATUS.SUCCESS;
      toast.success('Poprawnie usunieto pojazd');
    },

    [deleteVehicle.rejected]: (state, action) => {
      state.status = FETCH_STATUS.ERROR;
      state.error = action.payload;
      toast.error(action.payload);
    }
  }
});

export const selectVehicles = (state) => {
  const { vehicles } = state;
  const { sortFunc } = vehicles;
  const sorted = [...vehicles.items].sort(
    sortMethods[sortFunc.name][sortFunc.condition]
  );
  return { ...vehicles, items: sorted };
};

export const selectFilteredVehicles = createSelector(
  [selectVehicles, selectFilters],
  (vehicles, filters) => {
    const { vehicleFilter, carBrandFilter } = filters;

    const filtered = vehicles.items
      .filter((veh) =>
        vehicleFilter.enable ? veh.id === vehicleFilter.filter.value : veh
      )
      .filter((veh) =>
        carBrandFilter.enable ? veh.brand === carBrandFilter.filter.value : veh
      );

    return { ...vehicles, items: filtered };
  }
);

export const selectVehicleById = (state, vehicleId) =>
  state.vehicles.items.find((vehicle) => vehicle.id === vehicleId);

export const selectCarBrands = (state) => [
  ...new Set(state.vehicles.items.map((veh) => veh.brand))
];

export const selectVehicleSort = (state) => state.vehicles.sortCases;

export const { setSortFunc } = vehicleSlice.actions;

export default vehicleSlice.reducer;
