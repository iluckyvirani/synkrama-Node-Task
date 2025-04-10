import express from 'express';
import { AddBook, UpdateBookById, getBookyId, getAllBooks, deleteBook } from '../controllers/BookController.js';
import { validate } from '../middlewares/validate.js';
import  checkUserAuth  from '../middlewares/auth-middleware.js';
import { bookSchema } from '../validations/bookValidation.js';

const router = express.Router();


router.post('/add', checkUserAuth, validate(bookSchema), AddBook);
router.put('/update/:id', checkUserAuth, validate(bookSchema), UpdateBookById);
router.get('/:id', checkUserAuth, getBookyId);
router.get('/', checkUserAuth, getAllBooks);
router.delete('/delete/:id', checkUserAuth, deleteBook);




export default router