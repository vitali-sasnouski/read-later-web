export interface ArticleBase {
    title: string;
    url: string;
}

export interface Article extends ArticleBase {
    id: string;
    read: boolean;
    deleted: boolean;
    created: Date;
    changed: Date;
}
