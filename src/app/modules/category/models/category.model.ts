export class Category {
  id: number | undefined;
  name: string | undefined;
  description?: string;
  slug?: string;
  shortcut?: boolean;
  active: boolean | undefined;
}
