class State {
    constructor() {
        let storedEntities = localStorage.getItem('storedEntities');

        if(storedEntities) {
            this.entities = JSON.parse(storedEntities);
        } else {
            this.entities = [];
        }
    }

    setEntities(newEntities) {
        this.entities = newEntities;
        localStorage.setItem('storedEntities', JSON.stringify(newEntities));
    }
}

export default State;