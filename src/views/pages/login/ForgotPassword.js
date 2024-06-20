/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: '', license: '' })
  const [idUser, setIdUser] = useState()
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        'api/User/forgot-password?username=' +
          credentials.username +
          '&license=' +
          credentials.license,
      )
      const data = await res.json()
      if (data.status != 400) {
        setIdUser(data.data.id)
        navigate(`/change-password/${idUser}`)
      } else {
        toast.error('Tài khoản không tồn tại', { autoClose: 500, theme: 'colored' })
      }
      // navigate('/home')
    } catch (error) {
      //   console.log(error)
      toast.error('Lỗi kết nối', { autoClose: 500, theme: 'colored' })
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Quên mật khẩu</h1>
                  <p className="text-body-secondary">Tìm lại tài khoản</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Tên tài khoản"
                      autoComplete="username"
                      name="username"
                      onChange={handleOnChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Giấy phép"
                      autoComplete="license"
                      name="license"
                      onChange={handleOnChange}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="primary" type="submit">
                      Đăng nhập
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgotPassword
