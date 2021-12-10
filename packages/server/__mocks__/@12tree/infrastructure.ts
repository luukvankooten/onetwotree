import { buildMongooseModels } from "@12tree/infrastructure/src/schemas";
import { Repositories, User } from "@12tree/domain";
import spotify from "@12tree/infrastructure/src/connections/spotify";
import { MongooseConnection } from "@12tree/infrastructure/src/connections";

const { buildMongooseRepositories } = jest.requireActual(
  "@12tree/infrastructure"
);

const users: User[] = [
  {
    id: "50f71be7-5916-4be0-b82b-efcdae15a3ed",
    name: "Luuk",
    username: "kool171",
    email: "luukvankooten@gmail.com",
    friends: [],
    token: {
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwZjcxYmU3LTU5MTYtNGJlMC1iODJiLWVmY2RhZTE1YTNlZCIsIm5hbWUiOiJMdXVrIiwidXNlcm5hbWUiOiJrb29sMTcxIiwiZW1haWwiOiJsdXVrdmFua29vdGVuQGdtYWlsLmNvbSIsImlhdCI6MTYzODc4NDE4NX0.-fm1RvTNn7ouqV0X6Fyhn-LhVqdzsNMnM5RyM_jBn54",
      refreshToken:
        "923f629be2e8b76f:6c4be37cf8ff1e7813ae4f886e1c3f0e3945212c85bc14926f0536cd27a175c8a68a11283bc0730c2ae2afcb047c4499df6af7901f3648d9c2e92453d122556b",
      expiresIn: 3600,
      createdAt: 1638784185055,
    },
  },
  {
    id: "d83c8cca-96c2-4ad2-a6af-0a220d0fa879",
    name: "Luukv1",
    username: "luukkie",
    email: "l.vankooten@student.com",
    friends: [],
    token: {
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ4M2M4Y2NhLTk2YzItNGFkMi1hNmFmLTBhMjIwZDBmYTg3OSIsIm5hbWUiOiJMdXVrdjEiLCJ1c2VybmFtZSI6Imx1dWtraWUiLCJlbWFpbCI6ImwudmFua29vdGVuQHN0dWRlbnQuY29tIiwiaWF0IjoxNjM5MDU4MDIwfQ.QVho_Qo9P_WUt9UoSNGSxSGOt4Bpz98-Dc97zu0Uh-o",
      refreshToken:
        "56bdc55ec6e5ac14:92a46d99b12b9877b19b2571a607163fe18431a91d0af37a8fae5594b301c8e5fa91f808d629dc32c6ebbcc5e066843a86add2e74bdf4d7f05789a7347bda4da",
      expiresIn: 3600,
      createdAt: 1639058020619,
    },
  },
];

const get = async (id: string) => users.find((user) => user.id === id);
const create = async (user: User) => {
  const index = users.push(user);

  return users[index - 1];
};

const getByToken = async (token: string) =>
  users.find((user) => user.token.accessToken === token);

const friend = (accepted: boolean) => ({
  id: "d83c8cca-96c2-4ad2-a6af-0a220d0fa879",
  name: "Luukv1",
  username: "luukkie",
  email: "l.vankooten@student.com",
  accepted,
});

export default jest.fn((connection: string): Repositories => {
  const userRepo = {
    create: create,
    getByToken: getByToken,
    getWithToken: get,
    get,
    getByRefreshToken: get,
    getByEmail: get,
    delete: get,
    update: (user: User) => ({ ...get(user.id), ...user }),
    getFollowers: async () => [],
    unfollow: async () => friend(false),
    accept: async () => friend(true),
    follow: async () => friend(false),
  };

  const models = buildMongooseModels(MongooseConnection(connection));

  return {
    userRepo,
    ...buildMongooseRepositories(models, userRepo, spotify),
  };
});
