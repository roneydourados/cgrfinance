/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

//session
Route.post('/login', 'SessionsController.auth')
Route.post('/logout', 'SessionsController.logout')

//usuário
Route.post('/users', 'UsersController.create').middleware('auth')
Route.get('/users', 'UsersController.index').middleware('auth')
Route.put('/users', 'UsersController.updateUser').middleware('auth')

//pessoas
Route.post('/pessoas', 'PessoasController.create').middleware('auth')
Route.get('/pessoas', 'PessoasController.index').middleware('auth')
Route.put('/pessoas', 'PessoasController.update').middleware('auth')
Route.delete('/pessoas', 'PessoasController.delete').middleware('auth')

//formas de pagamento
Route.post('/formaspagamento', 'FormasPagamentosController.create').middleware('auth')
Route.get('/formaspagamento', 'FormasPagamentosController.index').middleware('auth')
Route.put('/formaspagamento', 'FormasPagamentosController.update').middleware('auth')
Route.delete('/formaspagamento', 'FormasPagamentosController.delete').middleware('auth')

//categorias
Route.post('/categorias', 'CategoriasController.create').middleware('auth')
Route.get('/categorias', 'CategoriasController.index').middleware('auth')
Route.put('/categorias', 'CategoriasController.update').middleware('auth')
Route.delete('/categorias', 'CategoriasController.delete').middleware('auth')

//movimento
Route.post('/movimento', 'MovimentosController.create').middleware('auth')
Route.get('/movimento', 'MovimentosController.index').middleware('auth')
Route.get('/movimento/dash', 'MovimentosController.indexDashboard').middleware('auth')
Route.put('/movimento', 'MovimentosController.update').middleware('auth')
Route.delete('/movimento', 'MovimentosController.delete').middleware('auth')
