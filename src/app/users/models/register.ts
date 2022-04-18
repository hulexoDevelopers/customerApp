export class registerModel {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string = 'customer';
    contact: string;
    address: string;
    state: string;
    data: [] = [];
    vehicles: [] = [];
    imageUrl: string = ''
    otpVerified: boolean = false;
}
