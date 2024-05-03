import { z } from "zod";

export const UserSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(3),
    email: z.string().min(3).email(),
    password: z.string().min(8)
});

export const BodyCreateUserSchema = UserSchema.omit({id: true});
export const ReturnBodyUserSchema = UserSchema.omit({password: true});
export const LoginUserBodyschema = UserSchema.omit({id:true, name:true})

export const TokenSchema =  z.object({accessToken: z.string()});

export const ReturnBodyUserLoginSchema = TokenSchema.extend({user: ReturnBodyUserSchema});

export const UserAutoLoginBodySchema = UserSchema.omit({password: true});