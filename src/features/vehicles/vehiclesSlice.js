import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { selectFilters } from '../templates/filterSlice';
import { firestore, firestoreFunctions } from '../../app/firebase/firebase';

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (arg = 1, thunkAPI) => {
    const vehicles = [];
    const coll = await firestore.collection('Vehicles').get();

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

      vehicles.push(vehicle);
    });

    return vehicles;
  }
);

export const addVehicle = createAsyncThunk(
  'vehicles/addVehicle',
  async (arg, thunkAPI) => {
    const currUser = thunkAPI.getState().auth.user;

    const {
      brand,
      checkupDate,
      mileage,
      model,
      name,
      registrationNumber,
      type
    } = arg;

    const vehicle = {
      brand: brand.label,
      checkupDate,
      mileage,
      model: model.model,
      name,
      registrationNumber,
      type,
      companyId: currUser.companyId,
      createdBy: currUser.id
    };

    await firestore
      .collection('Vehicles')
      .add(vehicle)
      .catch((err) => console.log(err));
  }
);

export const editVehicle = createAsyncThunk(
  'vehicles/editVehicle',
  async (arg, thunkAPI) => {
    const currUser = thunkAPI.getState().auth.user;
    const {
      id,
      brand,
      checkupDate,
      mileage,
      model,
      name,
      registrationNumber,
      type
    } = arg;

    const vehicle = {
      brand: brand.label,
      checkupDate,
      mileage,
      model: model.model,
      name,
      registrationNumber,
      type,
      updatedBy: currUser.id,
      updated: firestoreFunctions.FieldValue.serverTimestamp()
    };

    const docRef = firestore.collection('Vehicles').doc(id);

    await docRef.update(vehicle);
  }
);

export const deleteVehicle = createAsyncThunk(
  'vehicles/deleteVehicle',
  async (arg, thunkAPI) => {
    const docRef = firestore.collection('Vehicles').doc(arg);
    const vehicle = docRef.id;
    await docRef.delete();

    return vehicle;
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
      state.status = 'loading';
    },

    [fetchVehicles.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.items = [...action.payload];
    },

    [fetchVehicles.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addVehicle.pending]: (state, action) => {
      state.status = 'loading';
    },

    [addVehicle.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
    },

    [addVehicle.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [editVehicle.pending]: (state, action) => {
      state.status = 'loading';
    },

    [editVehicle.fulfilled]: (state, { payload }) => {
      state.items = [
        ...state.items.filter((v) => v.id !== payload.id),
        payload
      ];
      state.status = 'succeeded';
    },

    [editVehicle.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [deleteVehicle.pending]: (state, action) => {
      state.status = 'loading';
    },

    [deleteVehicle.fulfilled]: (state, { payload }) => {
      state.items = state.items.filter((veh) => veh.id !== payload);
      state.status = 'succeeded';
    },

    [deleteVehicle.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
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
