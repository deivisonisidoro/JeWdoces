'use strict'



/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.group(()=>{
    Route.resource("products", "ProductController").apiOnly()
})
const Helpers = use('Helpers')

Route.post('upload', async ({ request }) => {
  const profilePic = request.file('profile_pic', {
    types: ['image'],
    size: '2mb'
  })

  await profilePic.move(Helpers.tmpPath('uploads'), {
    name: 'custom-name.jpg'
  })

  if (!profilePic.moved()) {
    return profilePic.error()
  }
  return 'File moved'
})