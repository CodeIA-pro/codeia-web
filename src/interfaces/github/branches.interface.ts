export interface Branches {
    status: string;
    data:   Datum[];
}

export interface Datum {
    name:      string;
    commit:    Commit;
    protected: boolean;
}

export interface Commit {
    sha: string;
    url: string;
}
