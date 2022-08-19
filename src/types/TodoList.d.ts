declare interface TodoContext {
    context: {
        comment: string;
        datetime: string;
    };
    index: string;
}
declare interface TodoList extends TodoContext {
    completed: boolean
}
