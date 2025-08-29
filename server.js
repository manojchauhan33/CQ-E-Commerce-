import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import './config/database.js';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();


import  signupRoutes from './routes/signupRoute.js'
import  loginRoutes from './routes/loginRoute.js'
import verifyRoutes from './routes/verifyRoute.js'
import forgotRoutes from './routes/forgotRoute.js'
import resetRoutes from './routes/resetRoutes.js'
import changePasswordRoutes from './routes/changePassword.js'
import productRoutes from './routes/productRoutes.js';
import cartRoutes from "./routes/cartRoutes.js";
import logoutRoutes from "./routes/logoutRoutes.js";
import addProductRoute from "./routes/addProductRoutes.js"
import allProductRoute from "./routes/allProductRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import checkoutRoutes from "./routes/checkoutRoutes.js"
import orderRoutes from "./routes/ordersRoutes.js"
import allOrdersRoutes from "./routes/allOrdersRoutes.js"
import allusersRoute from './routes/allusersRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js';
import searchRoutes from './routes/searchRoutes.js';


app.use(bodyParser.urlencoded({
  extended: true,
}));





app.use(bodyParser.json()); 

app.use(cookieParser());




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static('public'));

app.use("/uploads", express.static("uploads"));




app.get('/', (req, res) => {
    res.redirect('/products');
});




app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/verify', verifyRoutes);
app.use('/forgot',forgotRoutes);
app.use('/reset-password', resetRoutes);
app.use('/change-password',changePasswordRoutes);
app.use('/products', productRoutes);
app.use("/cart", cartRoutes);
app.use('/logout', logoutRoutes);
app.use('/add-product',addProductRoute);
app.use('/all-product', allProductRoute);
app.use('/profile', profileRoutes);
app.use('/checkout',checkoutRoutes);
app.use('/orders',orderRoutes);
app.use('/all-orders',allOrdersRoutes);
app.use('/all-users',allusersRoute);
app.use('/categories', categoryRoutes);
app.use('/search', searchRoutes);




app.listen(3000, () => {
  console.log(`${process.env.PORT}`);
});



//priyanshu