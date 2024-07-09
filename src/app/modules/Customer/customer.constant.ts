import { TGender } from './customer.interface';

export const Gender: TGender[] = ['male', 'female', 'other'];

export const CustomerSearchableFields = [
  'email',
  'id',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];
