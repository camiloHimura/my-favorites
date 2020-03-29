
export const getLinks = jest.fn().mockImplementation(() => {
  return new Promise((resolve, reject) => {
                          const fakeData = [{id: '123', title: "test", url: "url test", tags: [1,2,3]},
                                              {id: '1234', title: "test 2", url: "url test 2", tags: [1,2,3]},
                                              {id: '12345', title: "test 3", url: "url test 3", tags: [1,2,3]}];
                          resolve(fakeData);
                      })
});

export const getLinksByTags = getLinks;

export const createLink = data => {
  return new Promise((resolve, reject) => {
      resolve({status: 'saved', data});
  })
};

export const getTags = jest.fn().mockImplementation(() => {
  console.log('getTags mock')
  return new Promise((resolve, reject) => {
                          const fakeData = [
                                  {color: "73B1BF", id: "5d16801384deb893dbd11fd8", name: "tutorial 1"},
                                  {color: "73B1BF", id: "5d16801384deb893dbd11fd8", name: "tutorial 2"},
                                  {color: "73B1BF", id: "5d16801384deb893dbd11fd8", name: "tutorial 3"},
                                  {color: "73B1BF", id: "5d16801384deb893dbd11fd8", name: "tutorial 4"},
                              ];
                          resolve(fakeData);
                      })
});

export const createTag = data => {
  console.log('createTag mock')
  return new Promise((resolve, reject) => {
      resolve({status: 'saved', data});
  })
};

export const deleteTag = data => {
  console.log('deleteTag mock')
  return new Promise((resolve, reject) => {
      resolve({status: "removed"});
  })
};

export const updateTagRequest = data => {
  console.log('updateTagRequest mock')
  return new Promise((resolve, reject) => {
      resolve({status: 'updated', data});
  })
};

export function removeTagLinkRequest(linkID, tagID){
  console.log('removeTagLinkRequest mock')
  return new Promise((resolve, reject) => {
      resolve({status: 'updated'});
  })
}

export function removeLinkRequest(linkID){
  console.log('removeLinkRequest mock')
  return new Promise((resolve, reject) => {
      resolve({status: 'removed'});
  })
}
