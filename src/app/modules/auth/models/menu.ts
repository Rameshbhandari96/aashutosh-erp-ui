export interface Menu {
    id: string;
    groupName: string;
    name: string;
    module: string;
    path: string;
    parentId?: string | null;
    description: string;
    iconClass: string;
    sortOrder?: number | null;
    isDisabled: boolean;
    createdDate: Date;
    modifiedDate?: Date | null;
    subMenus?: Menu[];
    expanded?: boolean;
    selected?: boolean;
}
