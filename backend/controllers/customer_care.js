import { CustomerCare, validate } from '../models/customer_care.js';
import bcrypt from 'bcrypt';
import _ from 'lodash';

export async function createCutomerAdmin(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  

  const customerAdmin = new CustomerCare(_.pick(req.body, ['email', 'password']));
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  customerAdmin.password = hashedPassword
  

  const token = customerAdmin.genAuthToken();
  customerAdmin.save();
  res
    .header('x-auth-token', token)
    .status(201)
    .json({ message: `Customer Admin created successfully`, data: _.pick(customerAdmin, ['_id', 'email', 'role']) });
}

export async function loginCustomerAdmin(req, res) {
  const { email, password } = req.body;
 
  const customerAdmin = await CustomerCare.findOne({ email });
  if (!customerAdmin) return res.status(400).send('Invalid email or password');
  
  const validPassword = await bcrypt.compare(password, customerAdmin.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');
  
  const token = customerAdmin.genAuthToken();
  res
    .header('x-auth-token', token)
    .status(200)
    .send({ message: 'Login successful', token });
}
