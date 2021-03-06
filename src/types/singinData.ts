interface SinginData {
  data: {
    id: string;
    ownerId: string;
    name: string;
    screenName: string;
    iconUrl: string;
    token: string;
    secret: string;
  };
  Cookie: string;
  origin: string;
}

export default SigninData;
