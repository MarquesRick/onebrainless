import { Router } from "express";
import cors from 'cors';
import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import authMiddleware from "./app/middlewares/authMiddleware";
import OrderController from "./app/controllers/OrderController";
import FlavorController from "./app/controllers/FlavorController";
import DoughController from "./app/controllers/DoughController";
import SizeController from "./app/controllers/SizeController";
import PizzaDayController from "./app/controllers/PizzaDayController";


const router = Router();
router.use(cors());


//#region User
router.get('/users', authMiddleware, function(req, res){
  UserController.getAll(req,res)
});

router.get('/user', authMiddleware, function(req, res){
  //const email = req.query.email as string;
    UserController.getUser(req, res);
});
//#endregion

//#region Auth
router.post('/auth', function(req, res){
  AuthController.authenticate(req, res);
});
//#endregion

//#region Order
router.get('/orders', authMiddleware, function(req, res){
  OrderController.getAll(res)
});

router.get('/orderByUser', authMiddleware ,function(req, res){
    OrderController.getByUser(req, res);
});

router.post('/orderSave', authMiddleware, function(req, res){
  OrderController.save(req, res);
});

router.put('/orderUpdate', authMiddleware, function(req, res){
  OrderController.update(req, res);
});

router.delete('/orderDelete', authMiddleware, function(req, res){
  OrderController.delete(req, res);
});
//#endregion

//#region Flavor
router.get('/flavors', authMiddleware, function(req, res){
  FlavorController.getAll(res)
});

router.get('/flavorById', authMiddleware ,function(req, res){
  FlavorController.getById(req, res);
});

router.post('/flavorSave', authMiddleware, function(req, res){
  FlavorController.save(req, res);
});

router.put('/flavorUpdate', authMiddleware, function(req, res){
  FlavorController.update(req, res);
});

router.delete('/flavorDelete', authMiddleware, function(req, res){
  FlavorController.delete(req, res);
});

//#endregion

//#region Dough
router.get('/doughs', authMiddleware, function(req, res){
  DoughController.getAll(res)
});

router.get('/doughById', authMiddleware ,function(req, res){
  DoughController.getById(req, res);
});

router.post('/doughSave', authMiddleware, function(req, res){
  DoughController.save(req, res);
});

router.put('/doughUpdate', authMiddleware, function(req, res){
  DoughController.update(req, res);
});

router.delete('/doughDelete', authMiddleware, function(req, res){
  DoughController.delete(req, res);
});
//#endregion

//#region Size
router.get('/sizes', authMiddleware, function(req, res){
  SizeController.getAll(res)
});

router.get('/sizeById', authMiddleware ,function(req, res){
  SizeController.getById(req, res);
});

router.post('/sizeSave', authMiddleware, function(req, res){
  SizeController.save(req, res);
});

router.put('/sizeUpdate', authMiddleware, function(req, res){
  SizeController.update(req, res);
});

router.delete('/sizeDelete', authMiddleware, function(req, res){
  SizeController.delete(req, res);
});

//#endregion

//#region PizzaDay
router.get('/pizzas', authMiddleware, function(req, res){
  PizzaDayController.getAll(res)
});

router.get('/pizzaById', authMiddleware ,function(req, res){
  PizzaDayController.getById(req, res);
});

router.get('/pizzaByWeekDay', authMiddleware ,function(req, res){
  PizzaDayController.getByWeekDay(req, res);
});

router.post('/pizzaSave', authMiddleware, function(req, res){
  PizzaDayController.save(req, res);
});

router.put('/pizzaUpdate', authMiddleware, function(req, res){
  PizzaDayController.update(req, res);
});

router.delete('/pizzaDelete', authMiddleware, function(req, res){
  PizzaDayController.delete(req, res);
});

//#endregion

export default router;
