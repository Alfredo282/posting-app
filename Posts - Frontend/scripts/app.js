const listElement = document.querySelector('#posts');
const btnAddPost = document.querySelector('#add-post-btn')
const postTemplate = document.querySelector('#single-post');
const postList = document.querySelector('ul');
const postSection = document.querySelector('#available-post');
const updateModal = document.querySelector('#modal-update');
const btnUpdate = document.querySelector('#modal-btn-update');
const btnCancel = document.querySelector('#modal-btn-cancel');

function fetchPost() {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/posts', {
      method: 'GET'
    })
    .then(response => {
      return response.json();
    })
    .then(responseData => {
      if (responseData.posts) {
        for (const post of responseData.posts) {
          const postElement = document.importNode(postTemplate.content, true);
          postElement.querySelector('h2').textContent = post.title.toUpperCase();
          postElement.querySelector('p').textContent = post.content;
          postElement.querySelector('li').id = post._id;
          listElement.append(postElement);
        }
      } else {
        const h3 = document.createElement('h3');
        h3.textContent = 'No Post';
        postSection.prepend(h3);
      }
      resolve();
    })
    .catch(err => {
      console.log(err);
      reject(err);
    });
  });
}

function fetchSinglePost(id) {
  fetch('http://localhost:3000/post/' + id, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(responseData => {
      const idInput = document.querySelector('#modal-id');
      const titleInput = document.querySelector('#modal-form #modal-title');
      const contentInput = document.querySelector('#modal-form #modal-content');
      
      idInput.value = id;
      titleInput.value = responseData.post.title;
      contentInput.textContent = responseData.post.content;
    })
    .catch(err => console.log(err));
}

function createPost() {
  return new Promise((resolve, reject) => {
    const title = document.querySelector('#title');
    const content = document.querySelector('#content');
    const post = {
      title: title.value,
      content: content.value
    };

    fetch('http://localhost:3000/post', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(response => {
      title.value = '';
      content.value = '';
      return response.json();
    })
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      console.log(err);
      reject(err);
    });
  });
}

function updatePost(id) {
  return new Promise((resolve, reject) => {
    const title = document.querySelector('#modal-form #modal-title').value;
    const content = document.querySelector('#modal-form #modal-content').value;
    const post = {
      title: title,
      content: content
    };
    fetch('http://localhost:3000/post/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      console.log(err);
      reject(err);
    });
  });
}

function deletePost(id) {
  fetch('http://localhost:3000/post/' + id, {
    method: 'DELETE'
  })
  .then(response => {
    console.log('Post Deleted');
  })
  .catch(err => console.log(err));
}

function clearElements() {
  return new Promise((resolve, reject) => {
    try {
      while (listElement.firstChild) {
        listElement.removeChild(listElement.firstChild);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

btnAddPost.addEventListener('click', event => {
  clearElements()
    .then(() => {
      return createPost();
    })
    .then(() => {
      return fetchPost();
    })
    .then(() => {
      console.log('Post Created');
    })
    .catch(err => console.log(err));
});

postList.addEventListener('click', event => {
  const listElement = event.target.closest('li');
  const postId = listElement.id;
  if(event.target.id === 'btn-delete') {
    deletePost(postId);
    listElement.remove();
  } else if(event.target.id === 'btn-update') {
    updateModal.style.visibility = 'visible';
    fetchSinglePost(postId);
  }
});

btnUpdate.addEventListener('click', event => {
  const postId = document.querySelector('#modal-id').value;
  clearElements()
    .then(() => {
      return updatePost(postId);
    })
    .then(() => {
      return fetchPost();
    })
    .then(() => {
      console.log('Post Updated');
    })
    .catch(err => {
      console.log(err);
    })
  updateModal.style.visibility = 'hidden';
});

btnCancel.addEventListener('click', event => {
  updateModal.style.visibility = 'hidden';
});

fetchPost();