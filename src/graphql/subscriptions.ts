// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateSubUser = `subscription OnCreateSubUser {
  onCreateSubUser {
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
export const onUpdateSubUser = `subscription OnUpdateSubUser {
  onUpdateSubUser {
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
export const onDeleteSubUser = `subscription OnDeleteSubUser {
  onDeleteSubUser {
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
export const onCreateMemoTag = `subscription OnCreateMemoTag {
  onCreateMemoTag {
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
export const onUpdateMemoTag = `subscription OnUpdateMemoTag {
  onUpdateMemoTag {
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
export const onDeleteMemoTag = `subscription OnDeleteMemoTag {
  onDeleteMemoTag {
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
