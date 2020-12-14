import { shallowEqual, useSelector } from 'react-redux';

export const validationMessages = {
  isDuplicate: 'Element już istnieje',
  record: {
    isDuplicate: 'Istnieje już ewidencja dla tego pojazdu w podanym okresie',
    wrongMileage:
      'Podany przebieg nie zgadza się z przebiegiem wybranego pojazdu'
  },
  vehicle: {
    isDuplicateName: 'Istnieje już pojazd o tej nazwie',
    isDuplicateRegistration: 'Istnieje już pojazd o takiej rejestracji'
  },
  user: {
    isDuplicateEmail: 'Isnieje już użytkownik z tym adresem e-mail'
  }
};

const useValidation = () => {
  const state = useSelector((state) => state);
  const { items: records } = state.records;
  const { items: vehicles } = state.vehicles;
  const { items: users } = state.users;

  const record = (values) => {
    const { month, year, vehicleId, mileage, id } = values;
    const oldRecord = records
      .map((rec) => ({
        month: rec.month,
        year: rec.year,
        vehicleId: rec.vehicleId,
        mileage: rec.mileage,
        id: rec.id
      }))
      .find((rec) => rec.id === id);

    const itemWasChanged = id ? !shallowEqual(values, oldRecord) : true;
    const isDuplicate = records.some(
      (rec) =>
        rec.month === month && rec.year === year && rec.vehicleId === vehicleId
    );

    if (itemWasChanged && isDuplicate) {
      return {
        error: validationMessages.record.isDuplicate,
        success: false
      };
    }

    const vehicle = vehicles.find((veh) => veh.id === vehicleId);
    if (vehicle.mileage !== mileage) {
      return {
        error: validationMessages.record.wrongMileage,
        success: false
      };
    }

    return { success: true, error: null };
  };

  const vehicle = (values) => {
    const {
      id,
      name,
      brand,
      model,
      registrationNumber,
      mileage,
      checkupDate,
      type
    } = values;

    const oldVehicle = vehicles
      .map((rec) => ({
        id: rec.id,
        name: rec.name,
        brand: rec.brand,
        model: rec.model,
        registrationNumber: rec.registrationNumber,
        mileage: rec.mileage,
        checkupDate: rec.checkupDate,
        type: rec.type
      }))
      .find((veh) => veh.id === id);

    const itemWasChanged = id ? !shallowEqual(values, oldVehicle) : true;
    const nameWasChanged = id ? name !== oldVehicle.name : true;
    const regNumberWasChanged = id
      ? registrationNumber !== oldVehicle.registrationNumber
      : true;

    if (itemWasChanged) {
      const isDuplicateName = vehicles.some(
        (veh) => veh.name.trim() === name.trim()
      );
      if (nameWasChanged && isDuplicateName) {
        return {
          error: validationMessages.vehicle.isDuplicateName,
          success: false
        };
      }

      const isDuplicateRegistration = vehicles.some(
        (veh) => veh.registrationNumber.trim() === registrationNumber.trim()
      );
      if (regNumberWasChanged && isDuplicateRegistration) {
        return {
          error: validationMessages.vehicle.isDuplicateRegistration,
          success: false
        };
      }
    }

    return { success: true, error: null };
  };

  const user = (values) => {
    console.log(values);

    const { id, name, surname, label, eMail, isDriver } = values;

    const oldUser = users
      .map((user) => ({
        id: user.id,
        name: user.name,
        surname: user.surname,
        label: user.label,
        eMail: user.eMail,
        isDriver: user.isDriver,
        isAppUser: user.isAppUser
      }))
      .find((user) => user.id === id);

    const itemWasChanged = id ? !shallowEqual(values, oldUser) : true;
    const eMailChanged = id ? oldUser.eMail !== eMail : true;

    if (itemWasChanged) {
      const isDuplicateMail = users.some(
        (veh) => veh.eMail.trim() === eMail.trim()
      );

      if (eMailChanged && isDuplicateMail) {
        return {
          error: validationMessages.user.isDuplicateEmail,
          success: false
        };
      }
    }

    return { success: true, error: null };
  };

  return { record, vehicle, user };
};

export default useValidation;
