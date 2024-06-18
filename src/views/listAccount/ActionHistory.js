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
import MuiDateRangePicker from '../../components/MuiDateRangePicker'


const ActionHistory = () => {
  const [accounts, setAccounts] = useState([])
 
  const fetchData = async () => {
    const id = sessionStorage.getItem('idUser')
    await fetch(`api/Action/history?IdUser=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="row">
       <MuiDateRangePicker />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Lịch sử hoạt động</strong>
            </CCardHeader>
            <CCardBody>
              <CTable hover bordered borderColor="primary">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tên tài khoản</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tên hành động</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Thời gian bắt đầu</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Thời gian thực hiện</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Kết quả</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Chi tiết</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {accounts &&
                    accounts.map((account, index) =>
                      account.actionName.map((action, actionIndex) => (
                        <CTableRow key={actionIndex}>
                          <CTableHeaderCell scope="row">{actionIndex + 1}</CTableHeaderCell>
                          <CTableDataCell>{account.fbUser}</CTableDataCell>
                          <CTableDataCell>{action}</CTableDataCell>
                          <CTableDataCell>{account.startTime[actionIndex]}</CTableDataCell>
                          <CTableDataCell>{account.excuteTime[actionIndex]}</CTableDataCell>
                          <CTableDataCell>{account.result.toString()}</CTableDataCell>
                          <CTableDataCell>{account.description.toString()}</CTableDataCell>
                        </CTableRow>
                      )),
                    )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default ActionHistory
