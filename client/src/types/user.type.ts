export interface User {
    id: number;
    username: string;
    firstName: string;
    lastname: string;
    fullName: string;
    gender: string;
    avatar: string;
    backgroundImage: string;
    biography: string;
    address: string;
    studyAt: string;
    workingAt: string;
    birthday: Date;
    email: string;
    phone: string;
    interestedUsers: Array<number>;
    isBlocked: boolean;
    role: string;
}

export type Users = Pick<User, 'id' | 'fullName' | 'avatar'>[];
