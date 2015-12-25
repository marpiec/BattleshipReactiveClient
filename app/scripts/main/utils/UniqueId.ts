class UniqueId {
    private static id:number = 0;

    static next(): number {
        UniqueId.id++;
        return UniqueId.id;
    }
}