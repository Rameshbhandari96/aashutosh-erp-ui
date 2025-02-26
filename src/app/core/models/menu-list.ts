export class NavModules {
  modulesName: string;
  navRootComponents: NavRootComponent[];

  constructor(modulesName: string, navRootComponents: NavRootComponent[]) {
    this.modulesName = modulesName;
    this.navRootComponents = navRootComponents;
  }
}

export class NavRootComponent {
  label: string;
  path?: string;
  icon?: string;
  menuLists?: MenuList[];

  constructor(label: string, path?: string, icon?: string, menuLists?: MenuList[]) {
    this.label = label;
    this.path = path;
    this.icon = icon;
    this.menuLists = menuLists; 
  }
}

export class MenuList {
  label: string;
  path?: string;
  children?: MenuList[];

  constructor(label: string, path?: string, children?: MenuList[]) {
    this.label = label;
    this.path = path;
    this.children = children; 
  }
}
