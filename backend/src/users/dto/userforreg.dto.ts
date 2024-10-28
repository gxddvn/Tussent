import { IsNotEmpty } from "class-validator";

export class UserForReg {
    name: string;
    email: string;
    password: string;
}

export class EmailVerifDto {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    emailHtml: string
}