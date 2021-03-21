import { useSelector } from 'react-redux';
import { USER_ROLES } from '../utils/constants';
import { validateNip, validateRegon } from '../utils/formUtils';

export const validationMessages = {
  isDuplicate: 'Element już istnieje',
  insufficientPrivileges: 'Brak uprawnień',
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
  company: {
    incorrectRegon: 'Niepoprany numer REGON',
    incorrectNip: 'Niepoprany numer NIP',
  },
};

const useValidation = () => {
  const state = useSelector((state) => state);
  const { items: records } = state.records;
  const { items: vehicles } = state.vehicles;
  const { items: users } = state.users;
  const { items: tripTemplates } = state.tripTemplates;
  const currentUser = state.auth.user;

  const record = (values) => {
    const { month, year, vehicleId, mileage } = values;

    const isDuplicate = records.some(
      (rec) =>
        rec.month === month && rec.year === year && rec.vehicleId === vehicleId,
    );

    if (isDuplicate) {
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
    const { name, registrationNumber } = values;

    const isDuplicateName = vehicles.some(
      (veh) => veh.name.trim() === name.trim(),
    );
    if (isDuplicateName) {
      return {
        error: validationMessages.vehicle.isDuplicateName,
        success: false,
      };
    }

    const isDuplicateRegistration = vehicles.some(
      (veh) => veh.registrationNumber.trim() === registrationNumber.trim(),
    );
    if (isDuplicateRegistration) {
      return {
        error: validationMessages.vehicle.isDuplicateRegistration,
        success: false,
      };
    }

    return { success: true, error: null };
  };

  const user = (values) => {
    const { email } = values;

    const isDuplicatemail = users.some(
      (user) => user.email?.trim() === email?.trim(),
    );

    if (isDuplicatemail) {
      return {
        error: validationMessages.user.isDuplicateEmail,
        success: false,
      };
    }

    return { success: true, error: null };
  };

  const tripTemplate = (values) => {
    const { name } = values;

    const isDuplicateLabel = tripTemplates.some(
      (template) => template.name.trim() === name.trim(),
    );

    if (isDuplicateLabel) {
      return {
        error: validationMessages.tripTemplate.isDuplicateLabel,
        success: false,
      };
    }

    return { error: null, success: true };
  };

  const company = (values) => {
    const { regon, nip } = values;

    if (!validateRegon(regon)) {
      return {
        error: validationMessages.company.incorrectRegon,
        success: false,
      };
    }

    if (!validateNip(nip)) {
      return {
        error: validationMessages.company.incorrectNip,
        success: false,
      };
    }

    if (currentUser.role !== USER_ROLES.ADMIN) {
      return {
        error: validationMessages.insufficientPrivileges,
        success: false,
      };
    }

    return { error: null, success: true };
  };

  return { record, vehicle, user, tripTemplate, company };
};

export default useValidation;
