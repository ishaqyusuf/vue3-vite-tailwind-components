import { TableStructure } from "@/@types/Interface";

export function useExport(structure: TableStructure[] = []) {
  return {
    structure,
  };
}
