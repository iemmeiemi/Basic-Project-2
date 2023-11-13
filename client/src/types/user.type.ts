export interface User {
    id: number;
    username: string;
    firstName: string;
    lastname: string;
    fullName: string;
    gender: string;
    avatar: string;
    email: string;
    phone: string;
    interestedUsers: Array<number>;
    isBlocked: boolean;
    role: string;
    refreshToken?: string;
}

export type Users = Pick<User, 'id' | 'fullName' | 'avatar'>[];
