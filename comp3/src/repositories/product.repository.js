import ProductDTO from "../dto/product.dto.js";

export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async get(limit, page, category, status, sort) {
    return await this.dao.get(limit, page, category, status, sort);
  }

  async getById(id) {
    const product = await this.dao.getById(id);
    //const productDTO = new ProductDTO(product);
    return product;
  }

  async add(product) {
    return await this.dao.add(product);
  }

  async update(pid, product) {
    return await this.dao.update(pid, product);
  }

  async delete(pid) {
    return await this.dao.delete(pid);
  }
}
