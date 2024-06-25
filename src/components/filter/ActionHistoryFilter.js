import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useContext, useState } from 'react'
import { ContextFunction } from '../../context/Context'
import { ConvertToViDateTime } from '../../helper/Constants'
import { isToday, toDate } from 'date-fns'
import dayjs from 'dayjs'
import { CButton, CCol, CContainer, CForm, CFormInput, CFormSelect, CRow } from '@coreui/react'

const ActionHistoryFilter = () => {
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [fillterData, setFillterData] = useState({ action: '0' })

  const { fillter, setFillter } = useContext(ContextFunction)
  const token = sessionStorage.getItem('token')

  const handleFilter = async (e) => {
    e.preventDefault()
    try {
      await fetch(
        `api/Action/history?token=${token}&start=${ConvertToViDateTime(fromDate)}&end=${ConvertToViDateTime(toDate)}&actionId=${fillterData.action}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setFillter(data.data)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChange = (e) => {
    setFillterData({ ...fillterData, [e.target.name]: e.target.value })
  }

  const handelDelte = () => {
    setFillter(null)
    setFromDate(null)
    setToDate(null)
    fillterData.action = '0'
  }

  return (
    <div>
      <CContainer>
        <CForm onSubmit={handleFilter}>
          <CRow className="">
            <CCol md={2}>
              <CFormInput type="text" id="search" placeholder="Tìm kiếm" />
            </CCol>
            <CCol md={2}>
              <CFormSelect name="action" value={fillterData.action} onChange={handleOnChange}>
                <option value="0">Chọn hành động</option>
                <option value="1">Thích</option>
                <option value="2">Bình luận</option>
                <option value="3">Đăng bài</option>
                <option value="4">Chia sẻ</option>
                <option value="5">Thả tim</option>
              </CFormSelect>
            </CCol>
            <CCol md={4}>
              <div className="d-flex align-items-center">
                <DatePicker
                  className=""
                  label="Từ ngày"
                  value={fromDate}
                  disableFuture
                  onChange={(newValue) => {
                    setFromDate(newValue)
                  }}
                />
                <div className="divider"></div>
                <DatePicker
                  label="Đến ngày"
                  value={toDate}
                  disableFuture
                  minDate={fromDate}
                  name="toDate"
                  onChange={(newValue) => {
                    setToDate(newValue)
                  }}
                />
              </div>
            </CCol>
            <CCol className="d-md-flex">
              <div className="d-md-flex justify-content-md-start align-items-center">
                <CButton className="me-md-2" color="primary" type="submit">
                  Áp dụng
                </CButton>
                <CButton color="secondary" onClick={handelDelte}>
                  Hủy bỏ
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CForm>
      </CContainer>
    </div>
  )
}

export default ActionHistoryFilter
