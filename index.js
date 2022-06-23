import DomManipulation from './DomManipulation.js';
import Api from './Api.js';
import State from './State.js';
import errorHandler from './errorHandler.js';

class Interactions extends DomManipulation {
    constructor() {
        super();

        this.api = new Api('https://jsonplaceholder.typicode.com');
        
        this.state = new State();
        this.clearList();
        let postElements = this.state.entities.map(entity => this.createPostElement(entity));
        this.fillList(...postElements);

        this.getOneBtn.addEventListener('click', async (e) => {
            try {
                e.preventDefault();

                let value = this.entityIdInput.value.trim();
                this.entityIdInput.value = "";
                if(value.length <= 0) {
                    throw new Error('Enter entity id');
                }

                let post = await this.api.getOne(value);
                this.state.setEntities([ post ]);

                const postElement = this.createPostElement(post);
                
                this.clearList();
                this.fillList(postElement);
            } catch (error) {
                errorHandler(error);
                return;
            }
        });

        this.getAllBtn.addEventListener('click', async (e) => {
            try {
                e.preventDefault();

                let posts = await this.api.getAll();
                this.state.setEntities(posts);

                const postElements = posts.map(post => this.createPostElement(post));
                
                this.clearList();
                this.fillList(...postElements);
            } catch (error) {
                errorHandler(error);
                return;
            }
        })
    }

    createPostElement(post) {
        return this.createListItem(post, async (data) => {
            post = await this.api.updateOne(post.id, data);

            this.state.setEntities(this.state.entities.map(entity => {
                if(entity.id === post.id) {
                    return post;
                } else {
                    return entity
                }
            }))
            
            return post;
        })
    }
}

let interactions = new Interactions();