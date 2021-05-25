/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import './CalendarByWeek.scss'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es'
import isSameDay from 'date-fns/isSameDay'
import isWithinInterval from 'date-fns/isWithinInterval'
import { startOfISOWeek, endOfISOWeek, getDate, eachDayOfInterval } from 'date-fns'
import { IconButton } from '@material-ui/core'
import clsx from 'clsx'
import format from 'date-fns/format'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { CalendarStyles } from './CalendarStyles'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setDay } from '../../../Redux/actions'

export const CalendarByWeek = (props) => {
  const { setStartDate, setEndDate } = props
  const days = useSelector((state) => state.days, shallowEqual) || []
  const [date, setDate] = useState(new Date())
  const classes = CalendarStyles()
  const dispatch = useDispatch()
  const localeMap = {
    es: esLocale,
  }

  useEffect(() => {
    const start = startOfISOWeek(date)
    const end = endOfISOWeek(date)
    const result = eachDayOfInterval({
      start,
      end,
    })

    if (days && days.length) {
      days.map((item, index) => {
        item.numberDay = getDate(result[index])
        item.dateDay = result[index]
        dispatch(setDay(item))
      })
    }

    setStartDate(start)
    setEndDate(end)
  }, [date, dispatch])

  const renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
    const start = startOfISOWeek(selectedDate)
    const end = endOfISOWeek(selectedDate)

    const dayIsBetween = isWithinInterval(date, { start, end })
    const isFirstDay = isSameDay(date, start)
    const isLastDay = isSameDay(date, end)

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    })

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    })
    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(date, 'd')} </span>
        </IconButton>
      </div>
    )
  }

  return (
    <div className="week-picker-container">
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap.es}>
        <DatePicker
          variant="static"
          openTo="date"
          value={date}
          onChange={setDate}
          renderDay={renderWrappedWeekDay}
          disableToolbar
        />
      </MuiPickersUtilsProvider>
    </div>
  )
}
