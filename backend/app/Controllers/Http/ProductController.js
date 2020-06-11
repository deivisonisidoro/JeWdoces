'use strict'
const Product = use('App/Models/Product') 
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class ProductController {
 
  async index ({request, view}) {
    const { page =1} = request.get()
    const product = await Product.query()
    .paginate(page , 10);
    return product
  }
    
    //return view.render('products', {product: products.toJSON() })
  
  async store ({ request}) {
    const data = request.only(["name", "type", "description"])
    const product = await Product.create(data)
    return product 
  }

  async show ({ params}) {
    const product = await Product.find(params.id)
    return product
  }

  async update ({ params, request }) {
    const data = request.only(["name", "type", "description"])
    const product = await Product.find(params.id)
    product.merge(data)
    await product.save()
    return product
  }

  async destroy ({ params}) {
    const product = await Product.find(params.id)
    await product.delete()
  }
}

module.exports = ProductController
