import React, { useContext, useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormSelect,
  CListGroup,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import DateRangPicker from '../../components/datetime/DatetRangePicker'
import { ContextFunction } from '../../context/Context'

const ActionHistory = () => {
  const [accounts, setAccounts] = useState([])
  const [listAccounts, setListAccounts] = useState({ id: '', fbUser: '' })
  const { fillter, setFillter } = useContext(ContextFunction)
  const token = sessionStorage.getItem('Token')

  const fetchData = async () => {
    try {
      const res = await fetch(`api/Action/history?Token=${token}`)
      const data = await res.json()

      setAccounts(data.data)

      const accountsList = data.data.map((element) => element)
      setListAccounts(accountsList)
      console.log(accountsList)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (fillter != null) {
      setAccounts(fillter)
    } else {
      fetchData()
    }
  }, [fillter])

  return (
    <CContainer>
      <DateRangPicker />

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
                    accounts.map((account, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{account.nameFb}</CTableDataCell>
                        <CTableDataCell>{account.action}</CTableDataCell>
                        <CTableDataCell>{account.startTime}</CTableDataCell>
                        <CTableDataCell>{account.endTime}</CTableDataCell>
                        <CTableDataCell>{account.result.toString()}</CTableDataCell>
                        <CTableDataCell>{account.resultDetail}</CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ActionHistory
