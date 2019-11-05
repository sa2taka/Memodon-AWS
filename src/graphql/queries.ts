// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    twitterId
    userName
    displayName
    iconUrl
    isPrivate
    OAuthToken
    OAuthSecret
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
export const getSubUser = `query GetSubUser($id: ID!) {
  getSubUser(id: $id) {
    id
    userName
    displayName
    iconUrl
    user {
      id
      twitterId
      userName
      displayName
      iconUrl
      isPrivate
      OAuthToken
      OAuthSecret
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
        id
        twitterId
        userName
        displayName
        iconUrl
        isPrivate
        OAuthToken
        OAuthSecret
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
      id
      twitterId
      userName
      displayName
      iconUrl
      isPrivate
      OAuthToken
      OAuthSecret
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
        id
        twitterId
        userName
        displayName
        iconUrl
        isPrivate
        OAuthToken
        OAuthSecret
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
