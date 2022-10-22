export type TUser = {
  readonly email: string;
  readonly name: string;
};

export type TOrder = {
  readonly _id: string;
  readonly ingredients: Array<string>
  readonly status: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
}
