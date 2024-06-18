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

const ChangePassword = () => {
    const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: '', password: '', confirmPassword: '' })
  const { id } = useParams();

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const request = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUser: id.toString(), currentPassword: credentials.password })
        };
      const res = await fetch(
        'https://localhost:7048/User/check-license?username=' +
          credentials.username +
          '&license=' +
          credentials.license,
      )
      const data = await res.json()
      if (data.status != 400) {
        navigate('/home')
      } else {
        toast.error('Xảy ra lỗi', { autoClose: 500, theme: 'colored' })
      }
     
    } catch (error) {
    //   console.log(error)
      toast.error('Lỗi', { autoClose: 500, theme: 'colored' })
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
                  <h1>Đổi mật khẩu</h1>
                  <p className="text-body-secondary">Thay đổi mật khẩu</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Tên tài khoản" autoComplete="username" name='username' onChange={handleOnChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Mật khẩu mới"
                      autoComplete="new-password"
                      name="password"
                      onChange={handleOnChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      autoComplete="new-password"
                      name="confirmPassword"
                      onChange={handleOnChange}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type='submit' color="success">Đổi mật khẩu</CButton>
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

export default ChangePassword
