import { useSelector } from 'react-redux';
import { shallowEqual, deepEqual } from '../../utils/objectUtils';

export const validationMessages = {
  isDuplicate: 'Element już istnieje',
  record: {
    isDuplicate: 'Istnieje już ewidencja dla tego pojazdu w podanym okresie',
    wrongMileage:
      'Podany przebieg nie zgadza się z przebiegiem wybranego pojazdu',
  },
  vehicle: {
    isDuplicateName: 'Istnieje już pojazd o tej nazwie',
    isDuplicateRegistration: 'Istnieje już pojazd o takiej rejestracji',
  },
  user: {
    isDuplicateEmail: 'Isnieje już użytkownik z tym adresem e-mail',
  },
  tripTemplate: {
    isDuplicateLabel: 'Istnieje już szablon z taką nazwą',
  },
};

const useValidation = () => {
  const state = useSelector((state) => state);
  const { items: records } = state.records;
  const { items: vehicles } = state.vehicles;
  const { items: users } = state.users;
  const { items: tripTemplates } = state.tripTemplates;

  const record = (values) => {
    const { month, year, vehicleId, mileage, id } = values;
    const oldRecord = records
      .map((rec) => ({
        month: rec.month,
        year: rec.year,
        vehicleId: rec.vehicleId,
        mileage: rec.mileage,
        id: rec.id,
      }))
      .find((rec) => rec.id === id);

    const itemWasChanged = id ? !shallowEqual(values, oldRecord) : true;
    const isDuplicate = records.some(
      (rec) =>
        rec.month === month && rec.year === year && rec.vehicleId === vehicleId,
    );

    if (itemWasChanged && isDuplicate) {
      return {
        error: validationMessages.record.isDuplicate,
        success: false,
      };
    }

    const vehicle = vehicles.find((veh) => veh.id === vehicleId);
    if (vehicle.mileage !== mileage) {
      return {
        error: validationMessages.record.wrongMileage,
        success: false,
      };
    }

    return { success: true, error: null };
  };

  const vehicle = (values) => {
    const { id, name, registrationNumber } = values;

    const oldVehicle = vehicles
      .map((rec) => ({
        id: rec.id,
        name: rec.name,
        brand: rec.brand,
        model: rec.model,
        registrationNumber: rec.registrationNumber,
        mileage: rec.mileage,
        checkupDate: rec.checkupDate,
        type: rec.type,
      }))
      .find((veh) => veh.id === id);

    const itemWasChanged = id ? !shallowEqual(values, oldVehicle) : true;
    const nameWasChanged = id ? name !== oldVehicle.name : true;
    const regNumberWasChanged = id
      ? registrationNumber !== oldVehicle.registrationNumber
      : true;

    if (itemWasChanged) {
      const isDuplicateName = vehicles.some(
        (veh) => veh.name.trim() === name.trim(),
      );
      if (nameWasChanged && isDuplicateName) {
        return {
          error: validationMessages.vehicle.isDuplicateName,
          success: false,
        };
      }

      const isDuplicateRegistration = vehicles.some(
        (veh) => veh.registrationNumber.trim() === registrationNumber.trim(),
      );
      if (regNumberWasChanged && isDuplicateRegistration) {
        return {
          error: validationMessages.vehicle.isDuplicateRegistration,
          success: false,
        };
      }
    }

    return { success: true, error: null };
  };

  const user = (values) => {
    const { id, email } = values;

    const oldUser = users
      .map((user) => ({
        id: user.id,
        name: user.name,
        surname: user.surname,
        label: user.label,
        email: user.email,
        isDriver: user.isDriver,
        isAppUser: user.isAppUser,
      }))
      .find((user) => user.id === id);

    const itemWasChanged = id ? !shallowEqual(values, oldUser) : true;
    const emailChanged = id ? oldUser.email !== email : true;

    if (itemWasChanged) {
      const isDuplicatemail = users.some(
        (user) => user.email?.trim() === email?.trim(),
      );

      if (emailChanged && isDuplicatemail) {
        return {
          error: validationMessages.user.isDuplicateEmail,
          success: false,
        };
      }
    }

    return { success: true, error: null };
  };

  const tripTemplate = (values) => {
    const { id, name } = values;

    const isDuplicateLabel = tripTemplates.some(
      (template) => template.name.trim() === name.trim(),
    );

    const oldTemplate = tripTemplates
      .map((t) => {
        const { id, name, purpose, stops } = t;
        return { id, name, purpose, stops };
      })
      .find((template) => template.id === id);

    const nameWasChanged = id ? name !== oldTemplate.name : true;
    const itemWasChanged = id ? !deepEqual(values, oldTemplate) : true;

    if (itemWasChanged) {
      if (nameWasChanged && isDuplicateLabel) {
        return {
          error: validationMessages.tripTemplate.isDuplicateLabel,
          success: false,
        };
      }
    }

    return { error: null, success: true };
  };

  return { record, vehicle, user, tripTemplate };
};

export default useValidation;
