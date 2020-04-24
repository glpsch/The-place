import onError from './onError.js';

export default class Api {
    constructor(server, authorizationToken) {
        this.server = server;
        this.authorizationToken = authorizationToken;
    }

    getDefaultUserInfo() {
        return fetch(this.server + '/users/me', {
            headers: {
                authorization: this.authorizationToken
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error: ${res.status}`);
            })
    }


    uploadUserInfo(name, info) {
        this.name = name;
        this.info = info;

        return fetch(this.server + '/users/me/', {
            method: 'PATCH',
            headers: {
                authorization: this.authorizationToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.name,
                about: this.info
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error: ${res.status}`);
            });
    }


    getInitialCards() {
        return fetch(this.server + '/cards/', {
            headers: {
                authorization: this.authorizationToken
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error: ${res.status}`);
            })
            .then((cards) => {
                return cards;
            });
    }


    uploadNewCard(title, link) {
        this.title = title;
        this.link = link;

        return fetch(this.server + '/cards/', {
            headers: {
                authorization: this.authorizationToken,
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ name: this.title, link: this.link })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error: ${res.status}`);
            })
    }

    removeCard(cardId) {
        this.cardId = cardId;

        return fetch(this.server  + '/cards/' + this.cardId, {
            headers: {
                authorization: this.authorizationToken,
                'Content-Type': 'application/json'
            },
            method: "DELETE"
        })
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject(`error: ${res.status}`);
                }
            });
    }
    //////////////

    addLike(cardId) {
        this.cardId = cardId;

        return fetch(this.server  + '/cards/like/' + this.cardId, {
            method: 'PUT',
            headers: {
                authorization: this.authorizationToken,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error: ${res.status}`);
            })
    }
    
    removeLike(cardId) {
        this.cardId = cardId;

        return fetch(this.server  + '/cards/like/' + this.cardId, {
            method: 'DELETE',
            headers: {
                authorization: this.authorizationToken,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error: ${res.status}`);
            })
    }


    changeAvatar(link) {
        this.link = link;

        return fetch(this.server + '/users/me/avatar', {          
            method: 'PATCH',
            headers: {
                authorization: this.authorizationToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: this.link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`error: ${res.status}`);
            });
    }


}