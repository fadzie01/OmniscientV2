import * as z from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, {message: "Please enter a valid name"}),
    username: z.string().min(2, {message: "Username must be at least 2 charecters"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "At least 8 charecters required."}),
  })
   

  export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: "At least 8 charecters required."}),
  })

  export const PostValidation = z.object({
    caption: z.string(),
    file: z.custom<File[]>(),
    location: z.string().min(3).max(120),
    tags: z.string(),

  })