import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {
    let [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    async function signup(values) {
        setLoading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
            .catch((error) => {
                setError(error.response.data.message)
                setLoading(false)
            }
            )
        console.log(data);
        console.log(error);

        if (data.message === 'success') {
            setLoading(true)
            navigate('/login')
        }
    }
    let validationSchema = Yup.object({
        name: Yup.string().required('name is required').min(3, 'minimum name is 3 letters').max(15, 'maximum name is 15 letters'),
        email: Yup.string().required('email is required').email('email invalid'),
        password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with cpital letter'),
        rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], 'rePassword dont match password'),
        phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}/, 'phone must be egyptian number')
    })

    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        }, validationSchema,
        onSubmit: signup
    })
    return <>
        <div>
            <form className='w-50 m-auto' onSubmit={formik.handleSubmit}>
                <h2 className='text-white my-2'>Register Now</h2>
                {error ? <div className="alert alert-danger mt-2 p-3">{error}</div> : ''}
                <label className='text-white ' htmlFor="name">Name</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} className='form-control my-2' type="text" name='name' id='name' />
                {formik.errors.name && formik.touched.name ?<p className='error'>{formik.errors.name}</p>:""}
                <label className='text-white ' htmlFor="email">Email</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className='form-control my-2' type="email" name='email' id='email' />
                {formik.errors.email && formik.touched.email ?<p className='error'>{formik.errors.email}</p>:""}
                <label className='text-white ' htmlFor="password">Password</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className='form-control my-2' type="password" name='password' id='password' />
                {formik.errors.password && formik.touched.password ?<p className='error'>{formik.errors.password}</p>:""}
                <label className='text-white ' htmlFor="rePassword">rePassword</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} className='form-control my-2' type="password" name='rePassword' id='rePassword' />
                {formik.errors.rePassword && formik.touched.rePassword ?<p className='error'>{formik.errors.rePassword}</p>:""}
                <label className='text-white ' htmlFor="phone">phone</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className='form-control my-2' type="tel" name='phone' id='phone' />
                {formik.errors.phone && formik.touched.phone ?<p className='error'>{formik.errors.phone}</p>:""}
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
                    <h6 className='text-white m-0'>if you already have account</h6>
                    <Link to={'/login'}>
                        <button className='btn btn-link '>Log in</button >
                    </Link>
                </div>

            </form>
        </div>
    </>
}
