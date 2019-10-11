// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateMemo = `subscription OnCreateMemo {
  onCreateMemo {
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
export const onUpdateMemo = `subscription OnUpdateMemo {
  onUpdateMemo {
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
export const onDeleteMemo = `subscription OnDeleteMemo {
  onDeleteMemo {
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
export const onCreateTag = `subscription OnCreateTag {
  onCreateTag {
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
export const onUpdateTag = `subscription OnUpdateTag {
  onUpdateTag {
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
export const onDeleteTag = `subscription OnDeleteTag {
  onDeleteTag {
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
