class DomManipulation { // extends Generator
    constructor() {
        this.entityIdInput = document.querySelector('#entity-id');
        this.getOneBtn = document.querySelector('#get-one');
        this.getAllBtn = document.querySelector('#get-all');
        this.list = document.querySelector('#list');
    }

    createListItem(data, editData) {
        const post = document.createElement('li');
        post.classList.add('list__item', 'post');

        const postTitle = document.createElement('div');
        postTitle.classList.add('post__title');
        post.appendChild(postTitle);

        const postInput = document.createElement('input');
        postInput.classList.add('input', 'post__input');
        postInput.type = 'text';
        postInput.value = data.title;
        postTitle.appendChild(postInput);

        const postBtn = document.createElement('button');
        postBtn.classList.add('input', 'btn', 'post__btn');
        postBtn.textContent = 'Edit';
        postBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            data.title = postInput.value;
            postBtn.textContent = '...';
            data = await editData(data);
            postBtn.textContent = 'Edit';
            postInput.value = data.title;
        });
        postTitle.appendChild(postBtn);

        const postBody = document.createElement('p');
        postBody.classList.add('post__body');
        postBody.textContent = data.body;
        post.appendChild(postBody);

        const postInfo = document.createElement('p');
        postInfo.classList.add('post__info');
        postInfo.textContent = `Post #${data.id} by User #${data.userId}`;
        post.appendChild(postInfo);

        return post;
    }

    clearList() {
        while(this.list.firstChild) {
            this.list.removeChild(this.list.firstChild);
        }
    }

    fillList(...elements) {
        elements.map(element => {
            this.list.appendChild(element);
        })
    }
}

export default DomManipulation;