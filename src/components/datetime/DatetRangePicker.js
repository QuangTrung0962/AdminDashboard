import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useContext, useState } from 'react'
import { ContextFunction } from '../../context/Context'
import { ConvertToViDateTime } from '../../helper/Constants'
import { isToday } from 'date-fns'
import dayjs from 'dayjs'
import { CButton, CCol, CContainer, CRow } from '@coreui/react'

const DateRangPicker = () => {
  const [openFromDate, setOpenFromDate] = useState(false)
  const [openToDate, setToFromDate] = useState(false)
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)

  const { fillter, setFillter } = useContext(ContextFunction)

  const handelFilter = async () => {
    if (fromDate && toDate) {
      const id = sessionStorage.getItem('idUser')
      await fetch(
        `api/Action/history?IdUser=${id}&start=${ConvertToViDateTime(fromDate)}&end=${ConvertToViDateTime(toDate)}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setFillter(data.data)
        })
    }
  }

  const handelDelte = () => {
    setFillter(null)
    setFromDate(null)
    setToDate(null)
  }

  return (
    <>
      <CRow>
        <CCol>
          <DatePicker
            label="Từ ngày"
            value={fromDate}
            disableFuture
            onChange={(newValue) => setFromDate(newValue)}
          />
        </CCol>
        <CCol>
          <DatePicker
            label="Đến ngày"
            value={toDate}
            disableFuture
            minDate={fromDate}
            onChange={(newValue) => setToDate(newValue)}
          />
        </CCol>
        <CCol className="d-md-flex">
          <div className="d-md-flex justify-content-md-start align-items-center">
            <CButton className="me-md-2" color="primary" onClick={handelFilter}>
              Áp dụng
            </CButton>
            <CButton color="secondary" onClick={handelDelte}>
              Hủy bỏ
            </CButton>
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default DateRangPicker
