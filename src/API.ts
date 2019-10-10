/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  cognitoId: string,
  tiwtterId: string,
  userName: string,
  displayName: string,
  iconUrl: string,
  isPrivate: boolean,
};

export type UpdateUserInput = {
  cognitoId?: string | null,
  tiwtterId?: string | null,
  userName?: string | null,
  displayName?: string | null,
  iconUrl?: string | null,
  isPrivate?: boolean | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateSubUserInput = {
  id?: string | null,
  userName: string,
  displayName: string,
  iconUrl: string,
  subUserUserId: string,
};

export type UpdateSubUserInput = {
  id: string,
  userName?: string | null,
  displayName?: string | null,
  iconUrl?: string | null,
  subUserUserId?: string | null,
};

export type DeleteSubUserInput = {
  id?: string | null,
};

export type CreateMemoInput = {
  id: string,
  statusId: string,
  createdAt: number,
  memoUserId: string,
};

export type UpdateMemoInput = {
  id: string,
  statusId?: string | null,
  createdAt: number,
  memoUserId?: string | null,
};

export type DeleteMemoInput = {
  id: string,
  createdAt: number,
};

export type CreateMemoTagInput = {
  id?: string | null,
  memoTagMemoId: string,
  memoTagTagId: string,
};

export type UpdateMemoTagInput = {
  id: string,
  memoTagMemoId?: string | null,
  memoTagTagId?: string | null,
};

export type DeleteMemoTagInput = {
  id?: string | null,
};

export type CreateTagInput = {
  id: string,
  name: string,
};

export type UpdateTagInput = {
  id: string,
  name: string,
};

export type DeleteTagInput = {
  id: string,
  name: string,
};

export type ModelUserFilterInput = {
  cognitoId?: ModelIDFilterInput | null,
  tiwtterId?: ModelStringFilterInput | null,
  userName?: ModelStringFilterInput | null,
  displayName?: ModelStringFilterInput | null,
  iconUrl?: ModelStringFilterInput | null,
  isPrivate?: ModelBooleanFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelBooleanFilterInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubUserFilterInput = {
  id?: ModelIDFilterInput | null,
  userName?: ModelStringFilterInput | null,
  displayName?: ModelStringFilterInput | null,
  iconUrl?: ModelStringFilterInput | null,
  and?: Array< ModelSubUserFilterInput | null > | null,
  or?: Array< ModelSubUserFilterInput | null > | null,
  not?: ModelSubUserFilterInput | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelMemoFilterInput = {
  id?: ModelIDFilterInput | null,
  statusId?: ModelStringFilterInput | null,
  createdAt?: ModelIntFilterInput | null,
  and?: Array< ModelMemoFilterInput | null > | null,
  or?: Array< ModelMemoFilterInput | null > | null,
  not?: ModelMemoFilterInput | null,
};

export type ModelIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelTagFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  and?: Array< ModelTagFilterInput | null > | null,
  or?: Array< ModelTagFilterInput | null > | null,
  not?: ModelTagFilterInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    cognitoId: string,
    tiwtterId: string,
    userName: string,
    displayName: string,
    iconUrl: string,
    isPrivate: boolean,
    note:  {
      __typename: "ModelMemoConnection",
      items:  Array< {
        __typename: "Memo",
        id: string,
        statusId: string,
        createdAt: number,
      } | null > | null,
      nextToken: string | null,
    } | null,
    subUser:  {
      __typename: "ModelSubUserConnection",
      items:  Array< {
        __typename: "SubUser",
        id: string,
        userName: string,
        displayName: string,
        iconUrl: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    cognitoId: string,
    tiwtterId: string,
    userName: string,
    displayName: string,
    iconUrl: string,
    isPrivate: boolean,
    note:  {
      __typename: "ModelMemoConnection",
      items:  Array< {
        __typename: "Memo",
        id: string,
        statusId: string,
        createdAt: number,
      } | null > | null,
      nextToken: string | null,
    } | null,
    subUser:  {
      __typename: "ModelSubUserConnection",
      items:  Array< {
        __typename: "SubUser",
        id: string,
        userName: string,
        displayName: string,
        iconUrl: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    cognitoId: string,
    tiwtterId: string,
    userName: string,
    displayName: string,
    iconUrl: string,
    isPrivate: boolean,
    note:  {
      __typename: "ModelMemoConnection",
      items:  Array< {
        __typename: "Memo",
        id: string,
        statusId: string,
        createdAt: number,
      } | null > | null,
      nextToken: string | null,
    } | null,
    subUser:  {
      __typename: "ModelSubUserConnection",
      items:  Array< {
        __typename: "SubUser",
        id: string,
        userName: string,
        displayName: string,
        iconUrl: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateSubUserMutationVariables = {
  input: CreateSubUserInput,
};

export type CreateSubUserMutation = {
  createSubUser:  {
    __typename: "SubUser",
    id: string,
    userName: string,
    displayName: string,
    iconUrl: string,
    user:  {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type UpdateSubUserMutationVariables = {
  input: UpdateSubUserInput,
};

export type UpdateSubUserMutation = {
  updateSubUser:  {
    __typename: "SubUser",
    id: string,
    userName: string,
    displayName: string,
    iconUrl: string,
    user:  {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type DeleteSubUserMutationVariables = {
  input: DeleteSubUserInput,
};

export type DeleteSubUserMutation = {
  deleteSubUser:  {
    __typename: "SubUser",
    id: string,
    userName: string,
    displayName: string,
    iconUrl: string,
    user:  {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type CreateMemoMutationVariables = {
  input: CreateMemoInput,
};

export type CreateMemoMutation = {
  createMemo:  {
    __typename: "Memo",
    id: string,
    statusId: string,
    user:  {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    },
    tags:  {
      __typename: "ModelMemoTagConnection",
      items:  Array< {
        __typename: "MemoTag",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: number,
  } | null,
};

export type UpdateMemoMutationVariables = {
  input: UpdateMemoInput,
};

export type UpdateMemoMutation = {
  updateMemo:  {
    __typename: "Memo",
    id: string,
    statusId: string,
    user:  {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    },
    tags:  {
      __typename: "ModelMemoTagConnection",
      items:  Array< {
        __typename: "MemoTag",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: number,
  } | null,
};

export type DeleteMemoMutationVariables = {
  input: DeleteMemoInput,
};

export type DeleteMemoMutation = {
  deleteMemo:  {
    __typename: "Memo",
    id: string,
    statusId: string,
    user:  {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    },
    tags:  {
      __typename: "ModelMemoTagConnection",
      items:  Array< {
        __typename: "MemoTag",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: number,
  } | null,
};

export type CreateMemoTagMutationVariables = {
  input: CreateMemoTagInput,
};

export type CreateMemoTagMutation = {
  createMemoTag:  {
    __typename: "MemoTag",
    id: string,
    memo:  {
      __typename: "Memo",
      id: string,
      statusId: string,
      user:  {
        __typename: "User",
        cognitoId: string,
        tiwtterId: string,
        userName: string,
        displayName: string,
        iconUrl: string,
        isPrivate: boolean,
      },
      tags:  {
        __typename: "ModelMemoTagConnection",
        nextToken: string | null,
      } | null,
      createdAt: number,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      memos:  {
        __typename: "ModelMemoTagConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type UpdateMemoTagMutationVariables = {
  input: UpdateMemoTagInput,
};

export type UpdateMemoTagMutation = {
  updateMemoTag:  {
    __typename: "MemoTag",
    id: string,
    memo:  {
      __typename: "Memo",
      id: string,
      statusId: string,
      user:  {
        __typename: "User",
        cognitoId: string,
        tiwtterId: string,
        userName: string,
        displayName: string,
        iconUrl: string,
        isPrivate: boolean,
      },
      tags:  {
        __typename: "ModelMemoTagConnection",
        nextToken: string | null,
      } | null,
      createdAt: number,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      memos:  {
        __typename: "ModelMemoTagConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type DeleteMemoTagMutationVariables = {
  input: DeleteMemoTagInput,
};

export type DeleteMemoTagMutation = {
  deleteMemoTag:  {
    __typename: "MemoTag",
    id: string,
    memo:  {
      __typename: "Memo",
      id: string,
      statusId: string,
      user:  {
        __typename: "User",
        cognitoId: string,
        tiwtterId: string,
        userName: string,
        displayName: string,
        iconUrl: string,
        isPrivate: boolean,
      },
      tags:  {
        __typename: "ModelMemoTagConnection",
        nextToken: string | null,
      } | null,
      createdAt: number,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      memos:  {
        __typename: "ModelMemoTagConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type CreateTagMutationVariables = {
  input: CreateTagInput,
};

export type CreateTagMutation = {
  createTag:  {
    __typename: "Tag",
    id: string,
    name: string,
    memos:  {
      __typename: "ModelMemoTagConnection",
      items:  Array< {
        __typename: "MemoTag",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateTagMutationVariables = {
  input: UpdateTagInput,
};

export type UpdateTagMutation = {
  updateTag:  {
    __typename: "Tag",
    id: string,
    name: string,
    memos:  {
      __typename: "ModelMemoTagConnection",
      items:  Array< {
        __typename: "MemoTag",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteTagMutationVariables = {
  input: DeleteTagInput,
};

export type DeleteTagMutation = {
  deleteTag:  {
    __typename: "Tag",
    id: string,
    name: string,
    memos:  {
      __typename: "ModelMemoTagConnection",
      items:  Array< {
        __typename: "MemoTag",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    cognitoId: string,
    tiwtterId: string,
    userName: string,
    displayName: string,
    iconUrl: string,
    isPrivate: boolean,
    note:  {
      __typename: "ModelMemoConnection",
      items:  Array< {
        __typename: "Memo",
        id: string,
        statusId: string,
        createdAt: number,
      } | null > | null,
      nextToken: string | null,
    } | null,
    subUser:  {
      __typename: "ModelSubUserConnection",
      items:  Array< {
        __typename: "SubUser",
        id: string,
        userName: string,
        displayName: string,
        iconUrl: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetSubUserQueryVariables = {
  id: string,
};

export type GetSubUserQuery = {
  getSubUser:  {
    __typename: "SubUser",
    id: string,
    userName: string,
    displayName: string,
    iconUrl: string,
    user:  {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type ListSubUsersQueryVariables = {
  filter?: ModelSubUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubUsersQuery = {
  listSubUsers:  {
    __typename: "ModelSubUserConnection",
    items:  Array< {
      __typename: "SubUser",
      id: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      user:  {
        __typename: "User",
        cognitoId: string,
        tiwtterId: string,
        userName: string,
        displayName: string,
        iconUrl: string,
        isPrivate: boolean,
      },
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetMemoQueryVariables = {
  id: string,
  createdAt: number,
};

export type GetMemoQuery = {
  getMemo:  {
    __typename: "Memo",
    id: string,
    statusId: string,
    user:  {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    },
    tags:  {
      __typename: "ModelMemoTagConnection",
      items:  Array< {
        __typename: "MemoTag",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: number,
  } | null,
};

export type ListMemosQueryVariables = {
  id?: string | null,
  createdAt?: ModelIntKeyConditionInput | null,
  filter?: ModelMemoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListMemosQuery = {
  listMemos:  {
    __typename: "ModelMemoConnection",
    items:  Array< {
      __typename: "Memo",
      id: string,
      statusId: string,
      user:  {
        __typename: "User",
        cognitoId: string,
        tiwtterId: string,
        userName: string,
        displayName: string,
        iconUrl: string,
        isPrivate: boolean,
      },
      tags:  {
        __typename: "ModelMemoTagConnection",
        nextToken: string | null,
      } | null,
      createdAt: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTagQueryVariables = {
  id: string,
  name: string,
};

export type GetTagQuery = {
  getTag:  {
    __typename: "Tag",
    id: string,
    name: string,
    memos:  {
      __typename: "ModelMemoTagConnection",
      items:  Array< {
        __typename: "MemoTag",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListTagsQueryVariables = {
  id?: string | null,
  name?: ModelStringKeyConditionInput | null,
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListTagsQuery = {
  listTags:  {
    __typename: "ModelTagConnection",
    items:  Array< {
      __typename: "Tag",
      id: string,
      name: string,
      memos:  {
        __typename: "ModelMemoTagConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    cognitoId: string,
    tiwtterId: string,
    userName: string,
    displayName: string,
    iconUrl: string,
    isPrivate: boolean,
    note:  {
      __typename: "ModelMemoConnection",
      items:  Array< {
        __typename: "Memo",
        id: string,
        statusId: string,
        createdAt: number,
      } | null > | null,
      nextToken: string | null,
    } | null,
    subUser:  {
      __typename: "ModelSubUserConnection",
      items:  Array< {
        __typename: "SubUser",
        id: string,
        userName: string,
        displayName: string,
        iconUrl: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    cognitoId: string,
    tiwtterId: string,
    userName: string,
    displayName: string,
    iconUrl: string,
    isPrivate: boolean,
    note:  {
      __typename: "ModelMemoConnection",
      items:  Array< {
        __typename: "Memo",
        id: string,
        statusId: string,
        createdAt: number,
      } | null > | null,
      nextToken: string | null,
    } | null,
    subUser:  {
      __typename: "ModelSubUserConnection",
      items:  Array< {
        __typename: "SubUser",
        id: string,
        userName: string,
        displayName: string,
        iconUrl: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    cognitoId: string,
    tiwtterId: string,
    userName: string,
    displayName: string,
    iconUrl: string,
    isPrivate: boolean,
    note:  {
      __typename: "ModelMemoConnection",
      items:  Array< {
        __typename: "Memo",
        id: string,
        statusId: string,
        createdAt: number,
      } | null > | null,
      nextToken: string | null,
    } | null,
    subUser:  {
      __typename: "ModelSubUserConnection",
      items:  Array< {
        __typename: "SubUser",
        id: string,
        userName: string,
        displayName: string,
        iconUrl: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateSubUserSubscription = {
  onCreateSubUser:  {
    __typename: "SubUser",
    id: string,
    userName: string,
    displayName: string,
    iconUrl: string,
    user:  {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnUpdateSubUserSubscription = {
  onUpdateSubUser:  {
    __typename: "SubUser",
    id: string,
    userName: string,
    displayName: string,
    iconUrl: string,
    user:  {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnDeleteSubUserSubscription = {
  onDeleteSubUser:  {
    __typename: "SubUser",
    id: string,
    userName: string,
    displayName: string,
    iconUrl: string,
    user:  {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnCreateMemoSubscription = {
  onCreateMemo:  {
    __typename: "Memo",
    id: string,
    statusId: string,
    user:  {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    },
    tags:  {
      __typename: "ModelMemoTagConnection",
      items:  Array< {
        __typename: "MemoTag",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: number,
  } | null,
};

export type OnUpdateMemoSubscription = {
  onUpdateMemo:  {
    __typename: "Memo",
    id: string,
    statusId: string,
    user:  {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    },
    tags:  {
      __typename: "ModelMemoTagConnection",
      items:  Array< {
        __typename: "MemoTag",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: number,
  } | null,
};

export type OnDeleteMemoSubscription = {
  onDeleteMemo:  {
    __typename: "Memo",
    id: string,
    statusId: string,
    user:  {
      __typename: "User",
      cognitoId: string,
      tiwtterId: string,
      userName: string,
      displayName: string,
      iconUrl: string,
      isPrivate: boolean,
      note:  {
        __typename: "ModelMemoConnection",
        nextToken: string | null,
      } | null,
      subUser:  {
        __typename: "ModelSubUserConnection",
        nextToken: string | null,
      } | null,
    },
    tags:  {
      __typename: "ModelMemoTagConnection",
      items:  Array< {
        __typename: "MemoTag",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: number,
  } | null,
};

export type OnCreateMemoTagSubscription = {
  onCreateMemoTag:  {
    __typename: "MemoTag",
    id: string,
    memo:  {
      __typename: "Memo",
      id: string,
      statusId: string,
      user:  {
        __typename: "User",
        cognitoId: string,
        tiwtterId: string,
        userName: string,
        displayName: string,
        iconUrl: string,
        isPrivate: boolean,
      },
      tags:  {
        __typename: "ModelMemoTagConnection",
        nextToken: string | null,
      } | null,
      createdAt: number,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      memos:  {
        __typename: "ModelMemoTagConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnUpdateMemoTagSubscription = {
  onUpdateMemoTag:  {
    __typename: "MemoTag",
    id: string,
    memo:  {
      __typename: "Memo",
      id: string,
      statusId: string,
      user:  {
        __typename: "User",
        cognitoId: string,
        tiwtterId: string,
        userName: string,
        displayName: string,
        iconUrl: string,
        isPrivate: boolean,
      },
      tags:  {
        __typename: "ModelMemoTagConnection",
        nextToken: string | null,
      } | null,
      createdAt: number,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      memos:  {
        __typename: "ModelMemoTagConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnDeleteMemoTagSubscription = {
  onDeleteMemoTag:  {
    __typename: "MemoTag",
    id: string,
    memo:  {
      __typename: "Memo",
      id: string,
      statusId: string,
      user:  {
        __typename: "User",
        cognitoId: string,
        tiwtterId: string,
        userName: string,
        displayName: string,
        iconUrl: string,
        isPrivate: boolean,
      },
      tags:  {
        __typename: "ModelMemoTagConnection",
        nextToken: string | null,
      } | null,
      createdAt: number,
    },
    tag:  {
      __typename: "Tag",
      id: string,
      name: string,
      memos:  {
        __typename: "ModelMemoTagConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnCreateTagSubscription = {
  onCreateTag:  {
    __typename: "Tag",
    id: string,
    name: string,
    memos:  {
      __typename: "ModelMemoTagConnection",
      items:  Array< {
        __typename: "MemoTag",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateTagSubscription = {
  onUpdateTag:  {
    __typename: "Tag",
    id: string,
    name: string,
    memos:  {
      __typename: "ModelMemoTagConnection",
      items:  Array< {
        __typename: "MemoTag",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteTagSubscription = {
  onDeleteTag:  {
    __typename: "Tag",
    id: string,
    name: string,
    memos:  {
      __typename: "ModelMemoTagConnection",
      items:  Array< {
        __typename: "MemoTag",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};
