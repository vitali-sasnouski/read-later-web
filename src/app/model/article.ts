import * as firebase from 'firebase/app';

export interface ArticleBase {
    title: string;
    url: string;
}

export interface Article extends ArticleBase {
    id: string;
    read: boolean;
    deleted: boolean;
    created: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
    changed: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
}
