 export type Admin = {
   id: string;
   firstName: string;
   lastName: string;
   username: string;
   createdAt?: string | null;
   updatedAt?: string | null;
 };
 
 export type CreateAdminInput = {
   firstName: string;
   lastName: string;
   username: string;
   password: string;
 };
 
 export type UpdateAdminInput = Partial<CreateAdminInput>;
 
 export type ListAdminsParams = {
   page?: number;
   pageSize?: number;
   name?: string;
 };
 
 export type ListAdminsResponse = {
   statusCode?: number;
   message?: string;
   data?: { result: Admin[]; count: number };
 };
