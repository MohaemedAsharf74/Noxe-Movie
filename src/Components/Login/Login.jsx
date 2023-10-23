import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { userContext } from '../../context/userToken';
import { Helmet } from 'react-helmet';

export default function Login() {
    let [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let { setToken } = useContext(userContext)
    let navigate = useNavigate();

    async function signin(values) {
        setLoading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
            .catch((error) => {
                setError(error.response.data.message)
                setLoading(false)
            }
            )
        console.log(data.token);
        console.log(error);

        if (data.message === 'success') {
            setLoading(true)
            localStorage.setItem('token', data.token)
            setToken(data.token)
            navigate('/')
        }
    }
    let validationSchema = Yup.object({
        email: Yup.string().required('email is required').email('email invalid'),
        password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with cpital letter'),
    })

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        }, validationSchema,
        onSubmit: signin
    })
    return <>
        <div>
            <form className='w-50 m-auto' onSubmit={formik.handleSubmit}>
                <h2 className='text-white my-2'>Login Now</h2>
                {error ? <div className="alert alert-danger mt-2 p-3">{error}</div> : ''}
                <label className='text-white ' htmlFor="email">Email</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className='form-control my-2' type="email" name='email' id='email' />
                {formik.errors.email && formik.touched.email ? <p className='error'>{formik.errors.email}</p> : ""}
                <label className='text-white ' htmlFor="password">Password</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className='form-control my-2' type="password" name='password' id='password' />
                {formik.errors.password && formik.touched.password ? <p className='error'>{formik.errors.password}</p> : ""}
                <div className='d-flex align-items-center '>
                    <div className="w-25 mx-2">
                        {loading ? <button className='btn m-auto' type='button'><ThreeDots
                            height="20"
                            width="100"
                            radius="9"
                            color="#4fa94d"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        /></button> : <button disabled={!formik.isValid && formik.dirty} className='btn btn-primary w-100' type='submet'>submet</button>
                        }
                    </div>
                    <h6 className='text-white m-0'>if you donot have account</h6>
                    <Link to={'/signup'}>
                        <button className='btn btn-link '>Sign up</button >
                    </Link>
                </div>

            </form>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet>
        </div>
    </>
}
