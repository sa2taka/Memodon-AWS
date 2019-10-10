// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getSubUser = `query GetSubUser($id: ID!) {
  getSubUser(id: $id) {
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
export const listSubUsers = `query ListSubUsers(
  $filter: ModelSubUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listSubUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      }
    }
    nextToken
  }
}
`;
export const getMemo = `query GetMemo($id: ID!, $createdAt: AWSTimestamp!) {
  getMemo(id: $id, createdAt: $createdAt) {
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
export const listMemos = `query ListMemos(
  $id: ID
  $createdAt: ModelIntKeyConditionInput
  $filter: ModelMemoFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listMemos(
    id: $id
    createdAt: $createdAt
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
  }
}
`;
export const getTag = `query GetTag($id: ID!, $name: String!) {
  getTag(id: $id, name: $name) {
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
export const listTags = `query ListTags(
  $id: ID
  $name: ModelStringKeyConditionInput
  $filter: ModelTagFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listTags(
    id: $id
    name: $name
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      name
      memos {
        nextToken
      }
    }
    nextToken
  }
}
`;
