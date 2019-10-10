// tslint:disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    cognitoId
    tiwtterId
    userName
    displayName
    iconUrl
    isPrivate
    note {
      items {
        id
        statusId
        createdAt
      }
      nextToken
    }
    subUser {
      items {
        id
        userName
        displayName
        iconUrl
      }
      nextToken
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    cognitoId
    tiwtterId
    userName
    displayName
    iconUrl
    isPrivate
    note {
      items {
        id
        statusId
        createdAt
      }
      nextToken
    }
    subUser {
      items {
        id
        userName
        displayName
        iconUrl
      }
      nextToken
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    cognitoId
    tiwtterId
    userName
    displayName
    iconUrl
    isPrivate
    note {
      items {
        id
        statusId
        createdAt
      }
      nextToken
    }
    subUser {
      items {
        id
        userName
        displayName
        iconUrl
      }
      nextToken
    }
  }
}
`;
export const createSubUser = `mutation CreateSubUser($input: CreateSubUserInput!) {
  createSubUser(input: $input) {
    id
    userName
    displayName
    iconUrl
    user {
      cognitoId
      tiwtterId
      userName
      displayName
      iconUrl
      isPrivate
      note {
        nextToken
      }
      subUser {
        nextToken
      }
    }
  }
}
`;
export const updateSubUser = `mutation UpdateSubUser($input: UpdateSubUserInput!) {
  updateSubUser(input: $input) {
    id
    userName
    displayName
    iconUrl
    user {
      cognitoId
      tiwtterId
      userName
      displayName
      iconUrl
      isPrivate
      note {
        nextToken
      }
      subUser {
        nextToken
      }
    }
  }
}
`;
export const deleteSubUser = `mutation DeleteSubUser($input: DeleteSubUserInput!) {
  deleteSubUser(input: $input) {
    id
    userName
    displayName
    iconUrl
    user {
      cognitoId
      tiwtterId
      userName
      displayName
      iconUrl
      isPrivate
      note {
        nextToken
      }
      subUser {
        nextToken
      }
    }
  }
}
`;
export const createMemo = `mutation CreateMemo($input: CreateMemoInput!) {
  createMemo(input: $input) {
    id
    statusId
    user {
      cognitoId
      tiwtterId
      userName
      displayName
      iconUrl
      isPrivate
      note {
        nextToken
      }
      subUser {
        nextToken
      }
    }
    tags {
      items {
        id
      }
      nextToken
    }
    createdAt
  }
}
`;
export const updateMemo = `mutation UpdateMemo($input: UpdateMemoInput!) {
  updateMemo(input: $input) {
    id
    statusId
    user {
      cognitoId
      tiwtterId
      userName
      displayName
      iconUrl
      isPrivate
      note {
        nextToken
      }
      subUser {
        nextToken
      }
    }
    tags {
      items {
        id
      }
      nextToken
    }
    createdAt
  }
}
`;
export const deleteMemo = `mutation DeleteMemo($input: DeleteMemoInput!) {
  deleteMemo(input: $input) {
    id
    statusId
    user {
      cognitoId
      tiwtterId
      userName
      displayName
      iconUrl
      isPrivate
      note {
        nextToken
      }
      subUser {
        nextToken
      }
    }
    tags {
      items {
        id
      }
      nextToken
    }
    createdAt
  }
}
`;
export const createMemoTag = `mutation CreateMemoTag($input: CreateMemoTagInput!) {
  createMemoTag(input: $input) {
    id
    memo {
      id
      statusId
      user {
        cognitoId
        tiwtterId
        userName
        displayName
        iconUrl
        isPrivate
      }
      tags {
        nextToken
      }
      createdAt
    }
    tag {
      id
      name
      memos {
        nextToken
      }
    }
  }
}
`;
export const updateMemoTag = `mutation UpdateMemoTag($input: UpdateMemoTagInput!) {
  updateMemoTag(input: $input) {
    id
    memo {
      id
      statusId
      user {
        cognitoId
        tiwtterId
        userName
        displayName
        iconUrl
        isPrivate
      }
      tags {
        nextToken
      }
      createdAt
    }
    tag {
      id
      name
      memos {
        nextToken
      }
    }
  }
}
`;
export const deleteMemoTag = `mutation DeleteMemoTag($input: DeleteMemoTagInput!) {
  deleteMemoTag(input: $input) {
    id
    memo {
      id
      statusId
      user {
        cognitoId
        tiwtterId
        userName
        displayName
        iconUrl
        isPrivate
      }
      tags {
        nextToken
      }
      createdAt
    }
    tag {
      id
      name
      memos {
        nextToken
      }
    }
  }
}
`;
export const createTag = `mutation CreateTag($input: CreateTagInput!) {
  createTag(input: $input) {
    id
    name
    memos {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const updateTag = `mutation UpdateTag($input: UpdateTagInput!) {
  updateTag(input: $input) {
    id
    name
    memos {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const deleteTag = `mutation DeleteTag($input: DeleteTagInput!) {
  deleteTag(input: $input) {
    id
    name
    memos {
      items {
        id
      }
      nextToken
    }
  }
}
`;
