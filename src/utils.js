import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getValidFilters = (filters, documentType) => {
  const cleanFilter = {};
  //Aquí es muy importante que yo tenga ya un diccionario de filtros
  switch (documentType) {
    case "videogame": {
      if (filters.categories) {
        if (typeof categories === "string") {
          cleanFilter["categories"] = { $in: [filters.categories] };
        } else {
          cleanFilter["categories"] = { $in: filters.categories };
        }
      }
      if (filters.gte) {
        cleanFilter["price"] = { $gte: filters.gte };
      }
      if (filters.price) {
        cleanFilter["price"] = filters.price;
      }
      return cleanFilter;
    }
  }
};
export default __dirname;
