import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module,
} from 'vuex-module-decorators';
import { API } from 'aws-amplify';
import * as Queries from '@/graphql/queries';
import store from '@/store/index';

export interface UserState {
  id: string;
  twitterId: string;
  userName: string;
  displayName: string;
  iconUrl: string;
  isSignin: boolean;
}

@Module({ store, name: 'theme', namespaced: true })
class User extends VuexModule implements UserState {
  public id: string = '';
  public twitterId: string = '';
  public userName: string = '';
  public displayName: string = '';
  public iconUrl: string = '';
  public isSignin: boolean = false;

  @Mutation
  public setInfo(data: UserState) {
    this.id = data.id;
    this.twitterId = data.twitterId;
    this.userName = data.userName;
    this.displayName = data.displayName;
    this.iconUrl = data.iconUrl;
    this.isSignin = true;
  }

  @Action({ commit: 'setInfo' })
  public async getUser(id: string) {
    return await API.graphql({
      query: Queries.getUser,
      variables: { id },
    });
  }
}

const userModule = getModule(User);
export default userModule;
