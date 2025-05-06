const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    try{
        res.json('Welcome To Student API');
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/jobs',async(req,res)=>{
    try{
        const result = await pool.query('select * from jobs');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/count_emp',async(req,res)=>{
    try{
        const result = await pool.query('select count(employee_id) from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/count_country',async(req,res)=>{
    try{
        const result = await pool.query('select count(country_id) from countries');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/count_departments',async(req,res)=>{
    try{
        const result = await pool.query('select count(department_id) from departments');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/count_jobs',async(req,res)=>{
    try{
        const result = await pool.query('select count(job_id) from jobs');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/count_location',async(req,res)=>{
    try{
        const result = await pool.query('select count(location_id) from locations');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/count_regions',async(req,res)=>{
    try{
        const result = await pool.query('select count(region_id) from regions');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/gettotalstd',async(req,res)=>{
    try{
        const result = await pool.query('select count(ID) from student');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/job_history_details', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT jh.*, e.first_name, e.last_name, j.job_title, c.country_name
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id
            JOIN departments d ON jh.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/regions_countries_locations', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.region_name, c.country_name, l.city, l.street_address
            FROM regions r
            JOIN countries c ON r.region_id = c.region_id
            JOIN locations l ON c.country_id = l.country_id
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/countries_regions_locations', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.country_name, r.region_name, l.city, l.street_address
            FROM countries c
            JOIN regions r ON c.region_id = r.region_id
            JOIN locations l ON c.country_id = l.country_id
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/locations_countries_regions', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT l.location_id, l.city, c.country_name, r.region_name
            FROM locations l
            JOIN countries c ON l.country_id = c.country_id
            JOIN regions r ON c.region_id = r.region_id
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/departments_employees_locations', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.department_name, e.first_name, e.last_name, l.city
            FROM departments d
            JOIN employees e ON d.department_id = e.department_id
            JOIN locations l ON d.location_id = l.location_id
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});


app.get('/employees_departments_locations_countries', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name, e.last_name, d.department_name, l.city, c.country_name
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/employees-managers-departments-locations', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name AS employee_first, e.last_name AS employee_last,
                   m.first_name AS manager_first, m.last_name AS manager_last,
                   d.department_name, l.city
            FROM employees e
            LEFT JOIN employees m ON e.manager_id = m.employee_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/employees-jobs-departments-locations', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name, e.last_name, j.job_title, d.department_name, l.city
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/employees-jobs-departments-managers', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name AS employee_first, e.last_name AS employee_last,
                   j.job_title, d.department_name,
                   m.first_name AS manager_first, m.last_name AS manager_last
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            LEFT JOIN employees m ON e.manager_id = m.employee_id
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/employees-jobs-departments-managers-locations', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name AS employee_first, e.last_name AS employee_last,
                   j.job_title, d.department_name,
                   m.first_name AS manager_first, m.last_name AS manager_last,
                   l.city
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            LEFT JOIN employees m ON e.manager_id = m.employee_id
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/countries-in-region-1', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT country_name
            FROM countries
            WHERE region_id = 1
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/departments-in-n-cities', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.department_name, l.city
            FROM departments d
            JOIN locations l ON d.location_id = l.location_id
            WHERE l.city LIKE 'N%'
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/employees-under-high-commission-managers', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN employees m ON d.manager_id = m.employee_id
            WHERE m.commission_pct > 0.15
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/job-titles-of-managers', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT j.job_title
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            WHERE e.employee_id IN (SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL)
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/postal-codes-in-asia', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT l.postal_code
            FROM locations l
            JOIN countries c ON l.country_id = c.country_id
            JOIN regions r ON c.region_id = r.region_id
            WHERE r.region_name = 'Asia'
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/departments-below-average-commission', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT d.department_name
            FROM departments d
            JOIN employees e ON d.department_id = e.department_id
            WHERE e.commission_pct IS NOT NULL
              AND e.commission_pct < (SELECT AVG(commission_pct) FROM employees WHERE commission_pct IS NOT NULL)
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/high-earners-in-department', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name, e.last_name, j.job_title, e.salary, e.department_id
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            WHERE e.salary > (
                SELECT AVG(e2.salary)
                FROM employees e2
                WHERE e2.department_id = e.department_id
            )
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/employees-without-department', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT employee_id, first_name, last_name
            FROM employees
            WHERE department_id IS NULL
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/employees-with-multiple-jobs', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.employee_id, e.first_name, e.last_name
            FROM employees e
            JOIN job_history jh ON e.employee_id = jh.employee_id
            GROUP BY e.employee_id, e.first_name, e.last_name
            HAVING COUNT(*) > 1
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/employee-count-by-department', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.department_name, COUNT(e.employee_id) AS employee_count
            FROM departments d
            LEFT JOIN employees e ON d.department_id = e.department_id
            GROUP BY d.department_name
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/total-salary-by-job', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT j.job_title, SUM(e.salary) AS total_salary
            FROM jobs j
            JOIN employees e ON j.job_id = e.job_id
            GROUP BY j.job_title
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/avg-commission-by-department', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.department_name, AVG(e.commission_pct) AS avg_commission
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            GROUP BY d.department_name
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/max-salary-by-country', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.country_name, MAX(e.salary) AS max_salary
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            GROUP BY c.country_name
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/employees-name-contains-z', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name, e.last_name, d.department_name, l.city, l.state_province
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            WHERE LOWER(e.first_name) LIKE '%z%'
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/jobs-in-date-range', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT j.job_title, d.department_name, e.first_name || ' ' || e.last_name AS full_name, jh.start_date
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id
            JOIN departments d ON jh.department_id = d.department_id
            WHERE jh.start_date >= '1993-01-01' AND jh.end_date <= '1997-08-31'
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/countries-cities-2plus-employees', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.country_name, l.city, COUNT(d.department_id) AS num_departments
            FROM departments d
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            JOIN employees e ON d.department_id = e.department_id
            GROUP BY c.country_name, l.city, d.department_id
            HAVING COUNT(e.employee_id) >= 2
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});


app.get('/last-jobs-no-commission', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name || ' ' || e.last_name AS full_name, j.job_title, jh.start_date, jh.end_date
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id
            WHERE e.commission_pct IS NULL
              AND (jh.employee_id, jh.end_date) IN (
                  SELECT employee_id, MAX(end_date)
                  FROM job_history
                  GROUP BY employee_id
              )
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/employee-country-details', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name || ' ' || e.last_name AS full_name, e.employee_id, c.country_name
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/min-salary-by-department', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT first_name, last_name, salary, department_id
            FROM employees
            WHERE (department_id, salary) IN (
                SELECT department_id, MIN(salary)
                FROM employees
                GROUP BY department_id
            )
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/third-highest-salary-employees', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT *
            FROM employees
            WHERE salary = (
                SELECT DISTINCT salary
                FROM employees
                ORDER BY salary DESC
                OFFSET 2 LIMIT 1
            )
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/above-average-salary-j-name-dept', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.employee_id, e.first_name, e.last_name, e.salary
            FROM employees e
            WHERE e.salary > (SELECT AVG(salary) FROM employees)
              AND e.department_id IN (
                  SELECT department_id
                  FROM employees
                  WHERE first_name ILIKE '%j%' OR last_name ILIKE '%j%'
              )
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connected Successfully.....Running on Port ${PORT}`)
});