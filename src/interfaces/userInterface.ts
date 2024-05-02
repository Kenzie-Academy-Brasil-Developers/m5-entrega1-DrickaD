import { z } from "zod";
import { 
    BodyCreateUserSchema,
    LoginUserBodyschema,
    ReturnBodyUserLoginSchema,
    ReturnBodyUserSchema,
    UserAutoLoginBodySchema } from './../schemas/index';


export type TBodyCreateUser = z.infer<typeof BodyCreateUserSchema>; 
export type TReturnBodyUser = z.infer<typeof ReturnBodyUserSchema>; 
export type TLoginUserBody = z.infer<typeof LoginUserBodyschema>; 
export type TReturnbodyUserLogin = z.infer<typeof ReturnBodyUserLoginSchema>; 
export type TUserAutoLoginBody = z.infer<typeof UserAutoLoginBodySchema>; 

