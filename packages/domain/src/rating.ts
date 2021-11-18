import Track from "./track";
import User from "./user";

export enum Rating {
	ONE,
	TWO,
	TRHEE,
	FOUR,
	FIVE
};

export interface Rate {
	rating: Rating,
	track: Track,
	user: User,
}