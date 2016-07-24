export interface TreeItem {
    expanded:boolean;
    hidden:boolean;
    level:number;
    children:TreeItem[];
}