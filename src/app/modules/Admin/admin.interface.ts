import { Model, Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';

export type TAdmin = {
  user: Types.ObjectId;
  fullName: string;
  gender: TGender;
  dateOfBirth?: Date;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TAdmin | null>;
}
