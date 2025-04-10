import express from 'express';
import { AddBook, UpdateBookById, getBookyId, getAllBooks, deleteBook } from '../controllers/BookController.js';
import { validate } from '../middlewares/validate.js';
import  checkUserAuth  from '../middlewares/auth-middleware.js';
import { bookSchema } from '../validations/bookValidation.js';

const router = express.Router();


router.post('/add', checkUserAuth, validate(bookSchema), AddBook);
router.put('/updateBookById/:id', checkUserAuth, validate(bookSchema), UpdateBookById);
router.get('/getBookById/:id', checkUserAuth, getBookyId);
router.get('/get/books', checkUserAuth, getAllBooks);
router.delete('/deleteBookById/:id', checkUserAuth, deleteBook);




export default router