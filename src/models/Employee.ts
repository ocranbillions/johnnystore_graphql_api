import { query } from '../db/dbConfig';
import { hashSync } from 'bcryptjs';

interface EmpoyeeI {
  name: string
  email: string
  password: string
  id?: number
}

export class Employee {
  name: string;
  email: string;
  password: string;
  
  constructor(user: EmpoyeeI) {
    this.name = user.name;
    this.email = user.email;
    this.password = hashSync(user.password, 10);
  }

  create = async (): Promise<number> => {
    const { name, email, password } = this;
    const sql = `INSERT INTO JohnnyEmployee (name, email, password) VALUES (?, ?, ?)`;
    const result = await query(sql, [name, email, password]);
    return result.insertId!;
  }

  static findOne = async(email: string): Promise<EmpoyeeI> => {
    const sql = `SELECT * from JohnnyEmployee WHERE email = ?`;
    const [result]= await query(sql, [email]);
    return result;
  }
  
}
