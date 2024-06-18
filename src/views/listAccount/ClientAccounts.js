import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const ClientAccounts = () => {
  const [accounts, setAccounts] = useState([])

  const fetchData = async () => {
    const id = sessionStorage.getItem('idUser')
    await fetch(`api/User/list-account?idUser=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách tài khoản khách hàng</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover bordered borderColor="primary">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tên tài khoản</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {accounts &&
                  accounts.map((account, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{account.userName}</CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ClientAccounts
