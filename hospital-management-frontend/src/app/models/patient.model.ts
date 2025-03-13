export interface Patient {
  id: number;
  name: string;
  age: number;
  diagnostic: string;
  doctorId?: number;
}
